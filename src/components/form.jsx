import React, { useState } from "react";
import axios from "axios";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 1. AmoCRM token (bu sizda allaqachon bo'lishi kerak)
      const accessToken = "YOUR_ACCESS_TOKEN"; // bu yerga haqiqiy token yoziladi

      // 2. Contact ma'lumotlarini yuborish
      const response = await axios.post(
        "https://YOUR_DOMAIN.amocrm.com/api/v4/contacts", // domeningizni yozing
        [
          {
            name: name,
            custom_fields_values: [
              {
                field_code: "PHONE",
                values: [{ value: phone }]
              }
            ]
          }
        ],
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json"
          }
        }
      );

      console.log("✅ Contact added successfully:", response.data);
      alert("Ma'lumot AmoCRMga yuborildi!");

    } catch (error) {
      console.error("❌ Xatolik:", error);
      alert("Xatolik yuz berdi. Console ni tekshiring.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: "300px", margin: "0 auto" }}>
      <h2>AmoCRM forma</h2>

      <label>Ismingiz:</label>
      <input
        type="text"
        value={name}
        required
        onChange={(e) => setName(e.target.value)}
        placeholder="Ism"
      />

      <label>Telefon raqam:</label>
      <input
        type="tel"
        value={phone}
        required
        onChange={(e) => setPhone(e.target.value)}
        placeholder="+998901234567"
      />

      <button type="submit" style={{ marginTop: "10px" }}>
        Yuborish
      </button>
    </form>
  );
};

export default ContactForm;
