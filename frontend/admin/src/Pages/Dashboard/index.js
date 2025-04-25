import React, { useEffect, useState } from 'react';
import AdminLayout from "../../Layout/AdminLayout";
import { getApihandler } from '../../Apihandler';

export default function Dashboard() {
  const [data, setData] = useState({});

  useEffect(() => {
    getAllCount();
  }, []);

  const getAllCount = async () => {
    let res = await getApihandler("/getAllCount");
    console.log("res", res);
    if (res) {
      setData(res);
    }
  };

  const cardStyle = {
    flex: '1',
    padding: '20px',
    borderRadius: '10px',
    backgroundColor: '#f5f5f5',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    margin: '10px',
    textAlign: 'center',
  };

  const numberStyle = {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#333',
  };

  const labelStyle = {
    fontSize: '16px',
    color: '#777',
    marginTop: '10px',
  };

  return (
    <AdminLayout>
      <div style={{ padding: '30px' }}>
        <h2 style={{ fontSize: '28px', marginBottom: '20px' }}>Dashboard</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <div style={cardStyle}>
            <div style={numberStyle}>{data.userCount || 0}</div>
            <div style={labelStyle}>Total Users</div>
          </div>
          <div style={cardStyle}>
            <div style={numberStyle}>{data.chefCount || 0}</div>
            <div style={labelStyle}>Total Chefs</div>
          </div>
          <div style={cardStyle}>
            <div style={numberStyle}>{data.bookingCount || 0}</div>
            <div style={labelStyle}>Total Bookings</div>
          </div>
          <div style={cardStyle}>
            <div style={numberStyle}>{data.notificationCount || 0}</div>
            <div style={labelStyle}>Total Notifications</div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
