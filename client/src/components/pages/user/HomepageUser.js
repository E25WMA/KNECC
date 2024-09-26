import React, { useState } from 'react';
import SpaceNew from '../../home/SpaceNew';
import { Box, Typography, Container, TextField, Button, Menu, MenuItem, Paper } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const HomepageUser = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [submittedTerm, setSubmittedTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [filter, setFilter] = useState({ price: null, location: null, status: null });

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleKeyPress = (e) => { if (e.key === 'Enter') setSubmittedTerm(searchTerm.trim()); };
  const handleSearchClick = () => setSubmittedTerm(searchTerm.trim());

  const handleFilterClick = (event) => setAnchorEl(event.currentTarget);
  const handleFilterClose = () => setAnchorEl(null);
  const handleFilterSelect = (filterType, value) => setFilter((prevFilter) => ({ ...prevFilter, [filterType]: value }));
  const handleResetFilters = () => setFilter({ price: null, location: null, status: null });

  const carouselItems = [
    { image: '/assets/ecc1.png', title: 'ห้องที่จอดมากที่สุด อับดับ 1' },
    { image: '/assets/ecc2.png', title: 'ห้องที่จอดมากที่สุด อับดับ 2' },
    { image: '/assets/ecc3.jpg', title: 'ห้องที่จอดมากที่สุด อับดับ 3' },
    { image: '/assets/ecc4.png', title: 'ห้องที่จอดมากที่สุด อับดับ 4' },
  ];

  return (
    <div style={{ backgroundColor: '#F5F5F5', minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: 'url(/assets/KN1.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '80px 0',
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h2" align="center" sx={{ color: '#FF8C00', textShadow: '4px 4px 6px rgba(0, 0, 0, 1)' }}>
          ระบบจองห้องประชุม สำหรับศูนย์แสดงนิทรรศการและการจัดประชุม KNECC
          </Typography>
          <Typography variant="h3" align="center" sx={{ color: '#FF8C00', marginTop: '20px' }}>
            
          </Typography>
        </Container>
      </Box>

      {/* Carousel */}
      <Container maxWidth="lg" sx={{ paddingTop: '40px', paddingBottom: '40px' }}>
        <Typography variant="h5" align="center" sx={{ color: '#333' }}>ข้อมูลห้องประชุมภายในสถานประกอบการ</Typography>
        <Carousel NextIcon={<ArrowForwardIosIcon />} PrevIcon={<ArrowBackIosIcon />}>
          {carouselItems.map((item, i) => (
            <Box key={i} sx={{ textAlign: 'center' }}>
              <img src={item.image} alt={item.title} style={{ width: '100%', height: '450px', objectFit: 'cover' }} />
              <Typography variant="h5" sx={{ marginTop: '10px', color: '#333' }}>{item.title}</Typography>
            </Box>
          ))}
        </Carousel>
      </Container>

      {/* Search & Filters */}
      <Container maxWidth="lg" sx={{ paddingTop: '30px', paddingBottom: '30px' }}>
        <Paper elevation={3} sx={{ padding: '20px', borderRadius: '10px', maxWidth: '800px', margin: '0 auto' }}>
          <Box display="flex" justifyContent="center" alignItems="center" sx={{ gap: '10px' }}>
            <TextField
              label="ค้นหาพื้นที่"
              variant="outlined"
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyPress={handleKeyPress}
              sx={{ flexGrow: 1 }}
            />
            <Button variant="contained" color="primary" onClick={handleSearchClick}>ค้นหา</Button>
            <Button variant="outlined" color="secondary" onClick={handleFilterClick}>ตัวกรอง</Button>

            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleFilterClose}>
              <MenuItem onClick={() => handleFilterSelect('price', 'low-to-high')}>กรองตามราคาต่ำไปสูง</MenuItem>
              <MenuItem onClick={() => handleFilterSelect('price', 'high-to-low')}>กรองตามราคาสูงไปต่ำ</MenuItem>
              <MenuItem onClick={() => handleFilterSelect('status', 'ห้องว่าง')}><Typography sx={{ color: 'green' }}>ห้องว่าง</Typography></MenuItem>
              <MenuItem onClick={() => handleFilterSelect('status', 'ห้องที่จองแล้ว')}><Typography sx={{ color: 'red' }}>มีผู้จองแล้ว</Typography></MenuItem>
            </Menu>

            <Button variant="outlined" color="warning" onClick={handleResetFilters}>รีเซ็ตการกรอง</Button>
          </Box>
        </Paper>
      </Container>

      {/* Display Spaces */}
      <Container maxWidth="lg" sx={{ paddingTop: '30px', paddingBottom: '30px' }}>
        <SpaceNew searchTerm={submittedTerm} filter={filter} />
      </Container>

      {/* Footer */}
      <Box sx={{ backgroundColor: '#FF8C00', padding: '20px', color: 'white', marginTop: 'auto' }}>
        <Typography variant="h4" align="center">KNECC Website</Typography>
        <Typography variant="body1" align="center">หากมีข้อผิดพลาดกรุณาติดต่อ</Typography>
        <Typography variant="body1" align="center">เบอร์โทร. 0 5596 8661</Typography>
        <Typography variant="body1" align="center">GMAIL. knecc@nu.ac.th</Typography>
        <Typography variant="body1" align="center">BY...E25WMA</Typography>
      </Box>
    </div>
  );
};

export default HomepageUser;
