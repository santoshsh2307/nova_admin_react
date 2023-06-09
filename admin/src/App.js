import React, { useState } from 'react';
import { Menu } from 'antd';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { DashboardOutlined, HomeOutlined, ProfileOutlined, SettingOutlined, ShopOutlined, ShoppingOutlined } from '@ant-design/icons/lib/icons';
import ShopTable from './components/shop_components/ShopTable';
import ShopFilters from './components/filters/ShopFilter';
import SpaTable from './components/spa_components/SpaTable';
import LabTable from './components/lab_components/LabTable';
import CscTable from './components/csc_components/CscTable';
import ClinicTable from './components/clinic_components/ClinicTable';
import LoginPage from './components/login_components/Login';
import Filter from './components/filter_componets/Filter';
function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = () => {
    // Perform login logic here
    setLoggedIn(true);
  };

  const handleLogout = () => {
    // Perform logout logic here
    setLoggedIn(false);
  };

  return (
    <div>
      {loggedIn ? (
        <div>
           <div> 
          <Header onLogout={handleLogout} />
          </div>
          <div className="wrapper">
            <div className="container">
              <div className=" left-side"><SlideMenu location={location} navigate={navigate} onLogout={handleLogout} /></div>
              <div >
              <div className='container-row'>
                <div className="top"><Filter></Filter></div>
                <div className="bottom"><Content /></div>
              </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <LoginPage onLogin={handleLogin}></LoginPage>
        // <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

function Header({ onLogout }) {
  return (
    <div style={{ height: 60, background: 'light-greay', color: 'black', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold' }}>
      <div>Header</div>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}

function SlideMenu({ location, navigate, onLogout }) {
  const selectedKeys = [location.pathname];

  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' , width: '100%' }}>
      <Menu
        selectedKeys={selectedKeys}
        onClick={({ key }) => {
          if (key === '/logout') {
            onLogout();
          } else {
            navigate(key);
          }
        }}
        items={[
          { label: 'Home', key: '/', icon: <HomeOutlined /> },
          { label: 'Dashboard', key: '/dash', icon: <DashboardOutlined /> },
          { label: 'Lab', key: '/lab', icon: <ShopOutlined /> },
          { label: 'Spa', key: '/spa', icon: <ShopOutlined /> },
          { label: 'Shalon', key: '/shalon', icon: <ShopOutlined /> },
          { label: 'CSC', key: '/csc', icon: <ShopOutlined /> },
          { label: 'Clinic', key: '/clinic', icon: <ShopOutlined /> },
          { label: 'Consumer', key: '/consumer', icon: <ShoppingOutlined />, children: [
            { label: 'Active', key: '/active', icon: <ShopOutlined /> },
            { label: 'Inactive', key: '/inactive', icon: <ShopOutlined /> },
          ] },
          { label: 'Profile', key: '/profile', icon: <ProfileOutlined /> },
          { label: 'Sign Out', key: '/logout', icon: <SettingOutlined  />, danger: true },
        ]}
      />
    </div>
  );
}

function Content() {
  return (
    <div style={{marginTop:'5px'}}>
      <Routes>
        <Route path="/" element={<div>Dashboard</div>} />
        <Route path="/dash" element={<div>Dashboard</div>} />
        <Route path="/lab" element={<div className="d-flex flex-column align-items-center"> <LabTable /></div>} />
        <Route path="/spa" element={<div className="d-flex flex-column align-items-center"> <SpaTable /></div>} />
        <Route path="/shalon" element={<div className="d-flex flex-column align-items-center"> <ShopTable /></div>} />
        <Route path="/csc" element={<div className="d-flex flex-column align-items-center"> <CscTable /></div>} />
        <Route path="/clinic" element={<div className="d-flex flex-column align-items-center"> <ClinicTable /></div>} />
        <Route path="/consumer" element={<div>Consumer</div>} />
        <Route path="/profile" element={<div>Profile</div>} />
        <Route path="/logout" element={<div>Logout</div>} />
        <Route path="/active" element={<div>Active</div>} />
        <Route path="/inactive" element={<div>Inactive</div>} />
      </Routes>
    </div>
  );
}

function Login({ onLogin }) {
  const handleLogin = () => {
    // Perform login logic here
    onLogin();
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleLogin}></button>
    </div>
  );
}

export default App;
