// Layout.jsx
import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

const TurfLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Light green theme colors
  const theme = {
    primaryGreen: '#22C55E',
    lightGreen: '#DCFCE7',
    darkGreen: '#16A34A',
    grayBg: '#F9FAFB',
    grayBorder: '#E5E7EB',
    textDark: '#111827',
    textLight: '#6B7280',
    white: '#FFFFFF',
  };

  // Menu items with paths
  const menuItems = [
    { id: 1, name: 'Dashboard', path: '/', icon: '📊' },
    { id: 2, name: 'Bookings', path: '/bookings', icon: '📅' },
    { id: 3, name: 'Profile', path: '/profile', icon: '👤' },
    { id: 4, name: 'Settings', path: '/settings', icon: '⚙️' },
  ];

  // Check if menu item is active
  const isActive = (path) => location.pathname === path;

  // Handle menu click
  const handleMenuClick = (path) => {
    navigate(path);
  };

  // Handle logo click
  const handleLogoClick = () => {
    navigate('/');
  };

  // Handle notification click
  const handleNotificationClick = () => {
    console.log('Notification clicked');
    // Will implement notification logic later
  };

  // Handle profile click
  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: theme.grayBg,
    }}>
      {/* NAVBAR */}
      <nav style={{
        backgroundColor: theme.white,
        borderBottom: `2px solid ${theme.lightGreen}`,
        padding: '0 24px',
        height: '64px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      }}>
        {/* Left side: Logo */}
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
            <span style={{ fontSize: '28px' }}>🏟️</span>
            <span style={{
              fontSize: '24px',
              fontWeight: '700',
              color: theme.primaryGreen,
              letterSpacing: '0.5px',
            }}>
              PLAYORA
            </span>
          </div>
        </div>

        {/* Right side: Icons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Notification Bell */}
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
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = theme.lightGreen}
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
              3
            </span>
          </button>

          {/* Profile Icon */}
          <button
            onClick={handleProfileClick}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '8px',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = theme.lightGreen}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <span style={{ fontSize: '20px' }}>👤</span>
          </button>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <div style={{
        display: 'flex',
        minHeight: 'calc(100vh - 64px)',
      }}>
        {/* SIDEBAR */}
        <aside style={{
          width: '240px',
          backgroundColor: theme.white,
          borderRight: `1px solid ${theme.grayBorder}`,
          padding: '24px 0',
        }}>
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
                      background: active ? theme.lightGreen : 'transparent',
                      color: active ? theme.primaryGreen : theme.textLight,
                      borderLeft: `4px solid ${active ? theme.primaryGreen : 'transparent'}`,
                      cursor: 'pointer',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      fontSize: '16px',
                      fontWeight: active ? '500' : '400',
                      textAlign: 'left',
                    }}
                    onMouseEnter={(e) => {
                      if (!active) {
                        e.currentTarget.style.backgroundColor = theme.lightGreen;
                        e.currentTarget.style.color = theme.darkGreen;
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
        </aside>

        {/* PAGE CONTENT AREA */}
        <main style={{
          flex: 1,
          padding: '32px',
          backgroundColor: theme.grayBg,
        }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default TurfLayout;