
import React, { useState, useEffect } from 'react';
import './Checkout.css';
import NavBar from '../NavBar/NavBar';
import axios from 'axios';
import { useLocation } from 'react-router-dom';


const CheckoutForm = () => {
  const location = useLocation();
  const total = location.state ? location.state.total : 0;

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
   
    country: '',
    phone: '',
    totalPrice: 47200,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const loadScript=(src)=> {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    }); 
  }

  const checkoutHandler =async()=> {
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    // Creating a new order (You may need to define 'cartItems' here)
    const result = await axios.post("http://localhost:5000/custom_pay", {
      amount: 59000*80,
    });

    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    // Getting the order details back 
    const { amount, id: order_id, currency } = result.data;

    const options = {
      key: "rzp_test_zpcvSUNJXUqrLv",
      currency: currency,
      name: "Test Corp.",
      description: "Test Transaction",
      order_id: order_id,
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };
        // navigate('/');
      },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send data to the server
      
      checkoutHandler();
      const response = await fetch('http://localhost:5000/server', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Form submitted:', formData);
        // Clear the form after successful submission
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
        
          country: '',
          phone: '',
        });
      } else {
        console.error('Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <>
      <NavBar />
      <div className='entire'>
        <div className="checkout-form-container dark-theme">
          <form onSubmit={handleSubmit} className='forme'>
            <h2><b>Checkout</b></h2>
            <br></br>
          
            <div className="form-section">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
        
            </div>
            <div className="form-section">
              <div className="form-group">
                <label htmlFor="country">Country</label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <button type="submit">Complete Purchase</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CheckoutForm;