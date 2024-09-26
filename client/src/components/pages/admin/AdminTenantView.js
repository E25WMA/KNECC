import React, { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Button,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Grid
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon, Check as CheckIcon, Cancel as CancelIcon } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { fetchTenants, deleteTenant, updateTenant, updateTenantStatus } from "../../../functions/tenant";

const AdminTenantView = () => {
    const [tenants, setTenants] = useState([]);
    const [editingTenant, setEditingTenant] = useState(null);
    const [formData, setFormData] = useState({
        name: '', email: '', phone: '', message: '',
        startDate: '', endDate: '', products: []
    });
    const [openProductDialog, setOpenProductDialog] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        loadTenants();
    }, [searchTerm]);

    const loadTenants = async () => {
        try {
            const { data } = await fetchTenants();
            if (data) {
                setTenants(data.filter(tenant =>
                    tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    tenant.email.toLowerCase().includes(searchTerm.toLowerCase())
                ));
            } else {
                throw new Error("No data received");
            }
        } catch (error) {
            toast.error("Failed to fetch tenants. " + error.message);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this tenant?")) {
            try {
                await deleteTenant(id);
                toast.success("Tenant deleted successfully");
                loadTenants();
            } catch (error) {
                toast.error("Failed to delete tenant. " + error.message);
            }
        }
    };

    const handleEdit = (tenant) => {
        setEditingTenant(tenant.id);
        setFormData({
            ...tenant,
            products: tenant.products.map(p => p.id),
            startDate: tenant.startDate ? new Date(tenant.startDate).toISOString().split('T')[0] : '', // Format as YYYY-MM-DD
            endDate: tenant.endDate ? new Date(tenant.endDate).toISOString().split('T')[0] : '' // Format as YYYY-MM-DD
        });
    };

    const handleUpdate = async () => {
        try {
            const formattedStartDate = new Date(formData.startDate).toISOString().split('T')[0]; // Format as YYYY-MM-DD
            const formattedEndDate = new Date(formData.endDate).toISOString().split('T')[0]; // Format as YYYY-MM-DD

            const updatedFormData = {
                ...formData,
                startDate: formattedStartDate,
                endDate: formattedEndDate
            };

            await updateTenant(editingTenant, updatedFormData);
            toast.success("Tenant updated successfully");
            setEditingTenant(null);
            resetForm();
            loadTenants();
        } catch (error) {
            toast.error("Failed to update tenant. " + error.message);
        }
    };

    const resetForm = () => {
        setFormData({ name: '', email: '', phone: '', message: '', startDate: '', endDate: '', products: [] });
    };

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleViewProducts = (products) => {
        setSelectedProducts(products);
        setOpenProductDialog(true);
    };

    const handleSearch = () => setSearchTerm(searchTerm.trim());

    const updateTenantStatusHandler = async (id, status) => {
        try {
            const { data } = await updateTenantStatus(id, status);
            if (data) {
                console.log('Status updated:', data);
                setTenants(prevTenants => prevTenants.map(tenant =>
                    tenant.id === id ? { ...tenant, status: data.status } : tenant
                ));
                toast.success(`Tenant ${status} successfully`);
            } else {
                throw new Error("Failed to update status");
            }
        } catch (error) {
            console.error('Error updating status:', error.response ? error.response.data : error.message);
            toast.error(`Failed to ${status} tenant. ${error.response ? error.response.data : error.message}`);
        }
    };

    const renderProductDetails = (products) => (
        <Box display="flex" justifyContent="center">
            <Grid container spacing={2} justifyContent="center">
                {products.length > 0 ? products.map((product, index) => (
                    <Grid item container spacing={2} key={index} alignItems="center">
                        <Grid item>
                            {product.file && (
                                <img src={`http://localhost:5000/uploads/${product.file}`} alt={product.name} style={{ width: '300px', height: '300px' }} />
                            )}
                        </Grid>
                        <Grid item xs>
                            <Typography variant="h5"><strong>ชื่อ:</strong> {product.name}</Typography>
                            <Typography variant="h6"><strong>รายละเอียด:</strong> {product.detail}</Typography>
                            <Typography variant="h6"><strong>ราคา:</strong> {product.price}</Typography>
                            <Typography variant="h6"><strong>สถานที่:</strong> {product.location}</Typography>
                            <Typography variant="h6" style={{
                                color: product.status === 'ห้องว่าง' ? 'green' : product.status === 'มีผู้จองแล้ว' ? 'red' : 'orange',
                                fontWeight: 'bold'
                            }}>
                                สถานะ: {product.status}
                            </Typography>
                        </Grid>
                    </Grid>
                )) : (
                    <Typography variant="h6" align="center">ไม่พบข้อมูลพื้นที่</Typography>
                )}
            </Grid>
        </Box>
    );

    return (
        <Box p={4}>
            <Typography variant="h4" gutterBottom>
                ข้อมูลแบบฟอร์ม
            </Typography>
            <Box display="flex" justifyContent="center" sx={{ marginBottom: '20px' }}>
                <TextField
                    label="ค้นหา"
                    variant="outlined"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    sx={{ width: '300px' }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSearch}
                    sx={{ marginLeft: '10px' }}
                >
                    ค้นหา
                </Button>
            </Box>
            {editingTenant ? (
                <Box component="form" onSubmit={handleUpdate} sx={{ mb: 2 }}>
                    <Typography variant="h6">แก้ไขข้อมูลแบบฟอร์ม</Typography>
                    {["name", "email", "phone", "message"].map((field) => (
                        <TextField
                            key={field}
                            name={field}
                            label={field.charAt(0).toUpperCase() + field.slice(1)}
                            fullWidth
                            margin="normal"
                            value={formData[field]}
                            onChange={handleChange}
                            required
                        />
                    ))}
                    {["startDate", "endDate"].map((field) => (
                        <TextField
                            key={field}
                            name={field}
                            label={field.charAt(0).toUpperCase() + field.slice(1)}
                            type="date"  // เปลี่ยนจาก datetime-local เป็น date
                            fullWidth
                            margin="normal"
                            value={formData[field]}
                            onChange={handleChange}
                            required
                            InputLabelProps={{ shrink: true }}
                        />
                    ))}
                    <Button type="button" variant="contained" color="primary" onClick={handleUpdate}>
                        Update
                    </Button>
                </Box>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {["Name", "Email", "Phone", "Message", "Slip", "Start Date", "End Date", "พื้นที่", "Status", "Approval", "Actions"].map(header => (
                                    <TableCell key={header}>{header}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tenants.map(tenant => (
                                <TableRow key={tenant.id}>
                                    <TableCell>{tenant.name}</TableCell>
                                    <TableCell>{tenant.email}</TableCell>
                                    <TableCell>{tenant.phone}</TableCell>
                                    <TableCell>{tenant.message}</TableCell>
                                    <TableCell>
                                        {tenant.slip ? (
                                            <a href={`http://localhost:5000/uploads/${tenant.slip}`} target="_blank" rel="noopener noreferrer">
                                                View Slip
                                            </a>
                                        ) : "No Slip"}
                                    </TableCell>
                                    <TableCell>{new Date(tenant.startDate).toLocaleDateString()}</TableCell>
                                    <TableCell>{new Date(tenant.endDate).toLocaleDateString()}</TableCell>
                                    <TableCell>
                                        <Button variant="outlined" onClick={() => handleViewProducts(tenant.products)}>
                                            ดูพื้นที่
                                        </Button>
                                    </TableCell>
                                    <TableCell
                                        style={{
                                            color: tenant.status === 'APPROVED' ? 'green' : tenant.status === 'REJECTED' ? 'red' : 'orange',
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        {tenant.status}
                                    </TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => updateTenantStatusHandler(tenant.id, 'APPROVED')}>
                                            <CheckIcon />
                                        </IconButton>
                                        <IconButton onClick={() => updateTenantStatusHandler(tenant.id, 'REJECTED')}>
                                            <CancelIcon />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => handleEdit(tenant)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton onClick={() => handleDelete(tenant.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
            <Dialog open={openProductDialog} onClose={() => setOpenProductDialog(false)} maxWidth="md" fullWidth>
                <DialogTitle>รายละเอียดพื้นที่</DialogTitle>
                <DialogContent>{renderProductDetails(selectedProducts)}</DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenProductDialog(false)} color="primary">Close</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default AdminTenantView;
