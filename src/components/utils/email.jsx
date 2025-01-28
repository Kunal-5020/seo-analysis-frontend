import React, { useState } from 'react';
import '../styles/email.css';

const PopupForm = ({ onSubmit, setIsPopupVisible }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
  });

  const [isPopupOpen, setIsPopupOpen] = useState(true);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, phone, email } = formData;

    if (name && phone && validateEmail(email)) {
      try {
        const response = await fetch('https://seo-analystics.onrender.com/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, phone, email }),
        });

        if (response.ok) {
          alert('Thank You for Trusting Us your Download will be Starting now!');
          onSubmit(); // Trigger the callback after form submission
          localStorage.setItem('formSubmitted', 'true');
          setIsPopupOpen(false); // Close the popup after submission
        } else {
          alert('Failed to send details. Please try again.');
        }
      } catch (err) {
        console.error('Error:', err);
        alert('Failed to send details. Please try again.');
      }
    } else {
      alert('Please fill in all fields correctly.');
    }
  };

  return (
    isPopupOpen && (
      <div className="popup-overlay">
        <div className="popup-container">
          <button onClick={() => {setIsPopupOpen(false); setIsPopupVisible(false);}} className="cross-btn">
            &times;
          </button>
          <h2 className="popup-heading">Contact Us</h2>

          <form onSubmit={handleSubmit} className="popup-form">
            <div className="form-group">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="form-input"
              />
              <label className="form-label">Name:</label>
            </div>
            <div className="form-group">
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="form-input"
              />
              <label className="form-label">Phone No:</label>
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="form-input"
              />
              <label className="form-label">Email:</label>
            </div>

            <button type="submit" className="submit-btn">
              Submit
            </button>
          </form>
        </div>
      </div>
    )
  );
};

export default PopupForm;
