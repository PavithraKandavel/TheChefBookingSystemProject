import React, { useEffect, useState } from "react";
import { getApihandler } from "../../Apihandler";
import Header from "../../Components/Header";
import "./PaymentPage.css";

export default function MyPayment() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getPayment();
  }, []);

  const getPayment = async () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const userid = userData._id;
    let res = await getApihandler(`/getChefPayments/${userid}`);
    console.log("res", res);
    if (res.status === 200) {
      setData(res.payments);
    }
  };

  return (
    <div>
      <Header />
      <div className="payment-list">
        {data.length > 0 ? (
          data.map((payment, index) => (
            <div key={index} className="modern-payment-card">
              <div className="payment-card-header">
                <h2>Payment Receipt</h2>
                <span
                  className={`status-badge ${payment.paymentStatus.toLowerCase()}`}
                >
                  {payment.paymentStatus}
                </span>
              </div>
              <div className="payment-info">
                <p>
                  <strong>User:</strong> {payment.user_Name}
                </p>
                <p>
                  <strong>Amount Paid:</strong>{" "}
                  {parseFloat(payment.price).toFixed(2)}
                </p>

                <p>
                  <strong>Booking Status:</strong> {payment.booking_status}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(payment.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="no-records">No payment records found.</p>
        )}
      </div>
    </div>
  );
}
