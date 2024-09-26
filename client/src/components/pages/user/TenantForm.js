import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Grid } from '@mui/material';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/th';

moment.locale('th');

const PageContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #F5F5F5;
  padding: 20px;
  overflow-y: auto;
  width: 100%;
`;

const FormContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  width: 100%;
  max-width: 500px;
`;

const QRCodeImage = styled.img`
  width: 200px;
  height: 200px;
  margin-bottom: 20px;
`;

const UploadButton = styled(Button)`
  margin-top: 20px;
  background-color: #175bdb; /* เปลี่ยนสีให้เหมือนกับปุ่มส่ง */
  &:hover {
    background-color: #0741ae;
  }
`;

const SuccessMessageContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #F5F5F5;
  padding: 20px;
`;

const SuccessMessageBox = styled(Box)`
  background-color: #fff;
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  text-align: center;
`;

const TenantForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
        slip: null,
        startDate: '',
        endDate: '',
        products: [],
        options: {
            option1: false,
            option2: false,
            option3: false
        }
    });

    const [formSubmitted, setFormSubmitted] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const productId = new URLSearchParams(location.search).get('product');
        if (productId) {
            setFormData(prevFormData => ({ ...prevFormData, products: [productId] }));
        }
    }, [location.search]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setFormData({
            ...formData,
            options: { ...formData.options, [name]: checked }
        });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, slip: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formattedStartDate = moment(formData.startDate).isValid() ? moment(formData.startDate).format('YYYY-MM-DD') : null;
        const formattedEndDate = moment(formData.endDate).isValid() ? moment(formData.endDate).format('YYYY-MM-DD') : null;

        if (!formattedStartDate || !formattedEndDate) {
            console.error('Invalid date format');
            return;
        }

        const formWithImageData = new FormData();
        for (const key in formData) {
            if (key === 'startDate') {
                formWithImageData.append(key, formattedStartDate);
            } else if (key === 'endDate') {
                formWithImageData.append(key, formattedEndDate);
            } else if (key === 'options') {
                formWithImageData.append(key, JSON.stringify(formData.options));
            } else {
                formWithImageData.append(key, formData[key]);
            }
        }

        try {
            const response = await fetch('http://localhost:5000/api/tenant', {
                method: 'POST',
                body: formWithImageData,
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data);
            setFormSubmitted(true);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleGoHome = () => {
        navigate('/user/index');
    };

    return (
        <PageContainer>
            {formSubmitted ? (
                <SuccessMessageContainer>
                    <SuccessMessageBox>
                        <Typography variant="h4" gutterBottom>
                            แบบฟอร์มของคุณถูกบันทึกแล้ว
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            กรุณารอเจ้าหน้าที่ติดต่อกลับ
                        </Typography>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: '#175bdb',
                                '&:hover': {
                                    backgroundColor: '#0741ae',
                                }
                            }}
                            onClick={handleGoHome}
                        >
                            กลับไปยังหน้า HomepageUser
                        </Button>
                    </SuccessMessageBox>
                </SuccessMessageContainer>
            ) : (
                <FormContainer>
                    <Typography variant="h4" gutterBottom align="center">
                        แบบฟอร์มผู้จอง
                    </Typography>
                    <form onSubmit={handleSubmit} style={{ width: '100%' }} encType="multipart/form-data">
                        <Grid container spacing={2}>
                            {/* ชื่อ, อีเมล, เบอร์โทรศัพท์, ข้อความ */}
                            <Grid item xs={12}>
                                <TextField
                                    name="name"
                                    label="ชื่อ"
                                    fullWidth
                                    margin="normal"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="email"
                                    label="อีเมล"
                                    type="email"
                                    fullWidth
                                    margin="normal"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="phone"
                                    label="เบอร์โทรศัพท์"
                                    type="tel"
                                    fullWidth
                                    margin="normal"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                             {/* Checkbox options */}
                             <Grid item xs={12}>
                                <Typography variant="h6" gutterBottom>
                                    อุปกรณ์เพิ่มเติม:
                                </Typography>
                                <label>
                                    <input
                                        type="checkbox"
                                        name="option1"
                                        checked={formData.options.option1}
                                        onChange={handleCheckboxChange}
                                    />
                                    _เครืองข่ายอินเทอร์เน็ต
                                </label><br />
                                <label>
                                    <input
                                        type="checkbox"
                                        name="option2"
                                        checked={formData.options.option2}
                                        onChange={handleCheckboxChange}
                                    />
                                    _โปรเจคเตอร์ + จอโปรเจคเตอร์
                                </label><br />
                                <label>
                                    <input
                                        type="checkbox"
                                        name="option3"
                                        checked={formData.options.option3}
                                        onChange={handleCheckboxChange}
                                    />
                                     _เครื่องเสียง 
                                </label>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="message"
                                    label="อื่นๆ"
                                    fullWidth
                                    margin="normal"
                                    multiline
                                    rows={4}
                                    value={formData.message}
                                    onChange={handleChange}
                                />
                            </Grid>

                            {/* วันที่เริ่มจอง, วันที่สิ้นสุด */}
                            <Grid item xs={12}>
                                <TextField
                                    name="startDate"
                                    label="วันที่เริ่มจอง"
                                    type="date"
                                    fullWidth
                                    margin="normal"
                                    value={formData.startDate}
                                    onChange={handleChange}
                                    required
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="endDate"
                                    label="วันที่สิ้นสุดจอง"
                                    type="date"
                                    fullWidth
                                    margin="normal"
                                    value={formData.endDate}
                                    onChange={handleChange}
                                    required
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                       
                            {/* QR Code */}
                            <Grid item xs={12} sx={{ textAlign: 'center' }}>
                                <QRCodeImage src="/assets/QRcode99.jpeg" alt="QR Code" />
                            </Grid>

                            {/* อัพโหลดสลิปการโอนจ่าย */}
                            <Grid item xs={12} sx={{ textAlign: 'center' }}>
                                <input
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    id="upload-slip"
                                    type="file"
                                    onChange={handleFileChange}
                                />
                                <label htmlFor="upload-slip">
                                    <UploadButton variant="contained" component="span">
                                        อัพโหลดสลิปการโอนจ่าย
                                    </UploadButton>
                                </label>
                            </Grid>

                            {/* Submit Button */}
                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{
                                        backgroundColor: '#175bdb',
                                        '&:hover': {
                                            backgroundColor: '#0741ae',
                                        },
                                        marginTop: '20px'
                                    }}
                                    fullWidth
                                >
                                    ส่ง
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                    <Typography variant="body1" style={{ marginTop: '40px' }}>
                        โปรดตรวจสอบข้อมูลให้ถูกต้องก่อนกดส่ง
                    </Typography>
                    <Typography variant="body1" style={{ marginTop: '40px' }}>
                        KNECC Website
                    </Typography>
                </FormContainer>
            )}
        </PageContainer>
    );
};

export default TenantForm;
