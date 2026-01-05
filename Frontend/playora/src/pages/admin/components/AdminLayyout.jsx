import React, {  useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

const AdminLayyout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [adminData,setAdminData]=useState({});

  useEffect(() => {
    const storedData = localStorage.getItem("adminData");
    if (storedData) {
      setAdminData(JSON.parse(storedData));
    }
  }, []);

  const theme = {
    primaryBlue: '#3B82F6',
    lightBlue: '#DBEAFE',
    darkBlue: '#2563EB',
    grayBg: '#F9FAFB',
    grayBorder: '#E5E7EB',
    textDark: '#111827',
    textLight: '#6B7280',
    white: '#FFFFFF',
  };

  // Admin menu items with paths
  const menuItems = [
    { id: 1, name: 'User Management', path: '/admin/adminDashBoard', icon: '👥' },
    { id: 2, name: 'Turf Management', path: '/admin/turfs', icon: '🏟️' },
    { id: 3, name: 'Reports', path: '/admin/reports', icon: '📋' },
  ];

  // Check if menu item is active
  const isActive = (path) => location.pathname === path;

  // Handle menu click
  const handleMenuClick = (path) => {
    navigate(path);
  };

  // Handle logo click
  const handleLogoClick = () => {
    navigate('/admin');
  };

  // Handle notification click
  const handleNotificationClick = () => {
    console.log('Admin notifications clicked');
  };

  // Handle admin profile click
  const handleProfileClick = () => {
    navigate('/admin/profile');
  };

  // Handle logout
  const handleLogout = () => {
    console.log('Admin logging out');
    // Add logout logic here
    navigate('/login');
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: theme.grayBg,
    }}>
      {/* ADMIN NAVBAR */}
      <nav style={{
        backgroundColor: theme.white,
        borderBottom: `2px solid ${theme.lightBlue}`,
        padding: '0 24px',
        height: '64px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      }}>
        {/* Left side: Admin Logo */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div 
            onClick={handleLogoClick}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              cursor: 'pointer',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <span style={{ fontSize: '28px' }}>🛡️</span>
            <span style={{
              fontSize: '24px',
              fontWeight: '700',
              color: theme.primaryBlue,
              letterSpacing: '0.5px',
            }}>
              PLAYORA ADMIN
            </span>
          </div>
        </div>

        {/* Right side: Admin Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Admin Notification Bell */}
          <button
            onClick={handleNotificationClick}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              position: 'relative',
              borderRadius: '8px',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = theme.lightBlue}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <span style={{ fontSize: '20px' }}>🔔</span>
            <span style={{
              position: 'absolute',
              top: '2px',
              right: '2px',
              backgroundColor: '#EF4444',
              color: 'white',
              fontSize: '10px',
              width: '16px',
              height: '16px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              5
            </span>
          </button>

          {/* Admin Profile */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '4px 8px',
            borderRadius: '8px',
            transition: 'background-color 0.2s',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = theme.lightBlue}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          onClick={handleProfileClick}
          >
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: theme.primaryBlue,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
            }}>
              A
            </div>
            <span style={{
              fontSize: '14px',
              fontWeight: '500',
              color: theme.textDark,
            }}>
              Admin
            </span>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: '#F3F4F6',
              border: `1px solid ${theme.grayBorder}`,
              color: theme.textLight,
              padding: '6px 12px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#EF4444';
              e.currentTarget.style.color = 'white';
              e.currentTarget.style.borderColor = '#DC2626';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#F3F4F6';
              e.currentTarget.style.color = theme.textLight;
              e.currentTarget.style.borderColor = theme.grayBorder;
            }}
          >
            Logout
          </button>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <div style={{
        display: 'flex',
        minHeight: 'calc(100vh - 64px)',
      }}>
        {/* ADMIN SIDEBAR */}
        <aside style={{
          width: '240px',
          backgroundColor: theme.white,
          borderRight: `1px solid ${theme.grayBorder}`,
          padding: '24px 0',
        }}>
          <div style={{
            padding: '0 24px 20px 24px',
            borderBottom: `1px solid ${theme.grayBorder}`,
            marginBottom: '20px',
          }}>
            <span style={{
              fontSize: '12px',
              fontWeight: '600',
              color: theme.textLight,
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}>
              ADMIN PANEL
            </span>
          </div>
          
          <ul style={{ listStyle: 'none' }}>
            {menuItems.map((item) => {
              const active = isActive(item.path);
              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleMenuClick(item.path)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '14px 24px',
                      width: '100%',
                      border: 'none',
                      background: active ? theme.lightBlue : 'transparent',
                      color: active ? theme.primaryBlue : theme.textLight,
                      borderLeft: `4px solid ${active ? theme.primaryBlue : 'transparent'}`,
                      cursor: 'pointer',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      fontSize: '16px',
                      fontWeight: active ? '500' : '400',
                      textAlign: 'left',
                    }}
                    onMouseEnter={(e) => {
                      if (!active) {
                        e.currentTarget.style.backgroundColor = theme.lightBlue;
                        e.currentTarget.style.color = theme.darkBlue;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!active) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = theme.textLight;
                      }
                    }}
                  >
                    <span style={{ fontSize: '20px' }}>{item.icon}</span>
                    <span>{item.name}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Admin Stats Section */}
          <div style={{
            padding: '20px 24px',
            marginTop: '20px',
            borderTop: `1px solid ${theme.grayBorder}`,
          }}>
            <div style={{ fontSize: '12px', color: theme.textLight, marginBottom: '8px' }}>
              System Status
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '4px',
            }}>
              <span style={{ fontSize: '14px', color: theme.textDark }}>
                Total Users
              </span>
              <span style={{ 
                fontSize: '14px', 
                fontWeight: '600',
                color: theme.primaryBlue 
              }}>
                1,234
              </span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <span style={{ fontSize: '14px', color: theme.textDark }}>
                Total Turfs
              </span>
              <span style={{ 
                fontSize: '14px', 
                fontWeight: '600',
                color: theme.primaryBlue 
              }}>
                89
              </span>
            </div>
          </div>
        </aside>

        {/* ADMIN CONTENT AREA */}
        <main style={{
          flex: 1,
          padding: '32px',
          backgroundColor: theme.grayBg,
          minWidth: 0, // For better flexbox handling
        }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayyout;