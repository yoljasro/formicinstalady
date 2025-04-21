import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ContactForm.css';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowForm(true), 300);
  }, []);

  const sendLead = async (e) => {
    e.preventDefault();

    if (!name || !phone) {
      setMessage("Iltimos, barcha maydonlarni to'ldiring.");
      return;
    }

    try {
      const response = await axios.post('https://formic.saifproface.uz/api/send-to-amocrm', {
        name,
        phone,
      });

      if (response.data.success) {
        setMessage("✅ Lead muvaffaqiyatli yuborildi.");
        setName('');
        setPhone('');
      } else {
        setMessage("❌ Noma'lum xatolik yuz berdi.");
      }
    } catch (err) {
      console.error('❌ Lead yuborishda xatolik:', err.message);
      setMessage('Xatolik yuz berdi: ' + err.message);
    }
  };

  return (
    <div className={`contact-container ${showForm ? 'fade-in' : ''}`}>
      <img src="/img/logo2.png" alt="InstaLady Logo" className="logo" />
      <h1 className="contact-title">InstaLady Akademiyasiga Ma'lumotlaringizni yuboring!</h1>
      <form onSubmit={sendLead} className="contact-form">
        <div className="input-group">
          <label htmlFor="name">Ism</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ismingizni kiriting"
            autoComplete="name"
          />
        </div>

        <div className="input-group">
          <label htmlFor="phone">Telefon raqami</label>
          <input
            id="phone"
            type="tel"
            inputMode="numeric"
            pattern="[0-9]*"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
            placeholder="Telefon raqamingizni kiriting"
            autoComplete="tel"
          />
        </div>

        <button type="submit" className="submit-button">
          Lead yuborish
        </button>
      </form>

      {message && (
        <div className={`message ${message.includes('Xatolik') ? 'error' : 'success'}`}>
          {message}
        </div>
      )}
    </div>
  );
};

export default ContactForm;
