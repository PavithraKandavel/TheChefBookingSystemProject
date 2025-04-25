import React, { useState } from 'react';
import './PaymentPage.css';
import { useNavigate, useParams } from 'react-router-dom';
import { postApihandler } from '../../Apihandler';
import swal from "sweetalert";

const PaymentPage = () => {
  const { chefId, avaibility, price } = useParams();
  const navigate = useNavigate();
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cvv, setCvv] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = JSON.parse(localStorage.getItem("userData"));
    const userid = userData._id;

    let item = {
      userId: userid,
      chefId: chefId,
      chefAvailabilityId: avaibility,
      cardDetails: {
        cardNumber,
        expiryMonth,
        expiryYear,
        cardHolderName: cardName,
        cvv,
      },
      price,
    };

    let res = await postApihandler("/proceedPayment", item);
    if (res.status === 200) {
        swal("Good job!", "Payment successful! Your chef has been booked.", "success", {
            button: "Go to My Bookings",
          }).then(() => {
            navigate("/mybookings"); // 👈 Redirect after confirmation
          });
    } else {
      swal("Error", res.error?.response?.data?.message || "An unknown error occurred.", "error");
    }
  };

  return (
    <>
      <div className="payment-container">
        <form className="payment-box" onSubmit={handleSubmit}>
          <h2 className="payment-title1">${price}</h2>
          <h2 className="payment-title">Payment Details</h2>

          <div className="form-group">
            <label htmlFor="cardNumber">Card Number</label>
            <input
              id="cardNumber"
              type="text"
              maxLength="19"
              placeholder="1234 5678 9012 3456"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="cardName">Cardholder's Name</label>
            <input
              id="cardName"
              type="text"
              placeholder="Full Name"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
            />
          </div>

          <div className="row">
            <div className="form-group quarter">
              <label htmlFor="expiryMonth">Month</label>
              <input
                id="expiryMonth"
                type="text"
                maxLength="2"
                placeholder="MM"
                value={expiryMonth}
                onChange={(e) => setExpiryMonth(e.target.value)}
              />
            </div>
            <div className="form-group quarter">
              <label htmlFor="expiryYear">Year</label>
              <input
                id="expiryYear"
                type="text"
                maxLength="4"
                placeholder="YYYY"
                value={expiryYear}
                onChange={(e) => setExpiryYear(e.target.value)}
              />
            </div>
            <div className="form-group quarter">
              <label htmlFor="cvv">CVV</label>
              <input
                id="cvv"
                type="password"
                maxLength="4"
                placeholder="•••"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
              />
            </div>
          </div>

          <div className="card-icons">
            <img
              className="visa-logo"
              src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
              alt="Visa"
            />
          </div>

          <button type="submit" className="pay-button">Pay Now</button>
        </form>
      </div>

     
    </>
  );
};

export default PaymentPage;
