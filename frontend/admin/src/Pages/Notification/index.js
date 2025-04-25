import React, { useEffect, useState } from 'react';
import AdminLayout from '../../Layout/AdminLayout';
import { getApihandler } from '../../Apihandler';

export default function Notification() {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        getNotify();
    }, []);

    const getNotify = async () => {
    
        const res = await getApihandler("/getAllNotification");
        if (res?.data) {
            setNotifications(res.data);
        }
    };

    return (
        <>
            <AdminLayout>
            <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
  <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', color: '#333' }}>
    Notifications
  </h2>

  {notifications.length > 0 ? (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '16px',
      }}
    >
      {notifications.map((notification) => (
        <div
          key={notification._id}
          style={{
            backgroundColor: '#fff',
            borderRadius: '10px',
            padding: '16px',
            border: '1px solid #ddd',
            boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
            transition: '0.3s ease',
          }}
        >
          <div style={{ fontSize: '12px', color: '#777', marginBottom: '6px' }}>
            {new Date(notification.createdAt).toLocaleString()}
          </div>
          <p style={{ fontSize: '14px', color: '#444', marginBottom: '8px' }}>
            {notification.message}
          </p>
          <p style={{ fontSize: '13px', color: '#555' }}>
            Booked by:{' '}
            <span style={{ fontWeight: 'bold', color: '#222' }}>
              {notification.user_name}
            </span>
          </p>
        </div>
      ))}
    </div>
  ) : (
    <p style={{ textAlign: 'center', color: '#888' }}>No notifications available.</p>
  )}
</div>

</AdminLayout>
            
        </>
    );
}
