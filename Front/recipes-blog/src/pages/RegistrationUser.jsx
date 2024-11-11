import React, { useState } from "react";

const RegistrationUser = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Vérifie le contenu de formData
      if (!formData.email || !formData.password) {
        setMessage("Email et mot de passe sont requis.");
        return;
      }
  
      const response = await fetch("http://localhost:3000/register", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
      });
  
      // Vérifie si la requête a réussi
      if (!response.ok) {
        const errorData = await response.json();
        setMessage(Array.isArray(errorData.errors) ? errorData.errors : [errorData.errors]);
        return;

      }
  
      // Traite la réponse si la requête a réussi
      const data = await response.json();
      setMessage([data.message]);
  
  } catch (error) {
      console.error("Erreur de requête:", error);
      setMessage("Erreur lors de l'enregistrement");
  }
  
  
  };

  return (
    <>
      <h1>Register form</h1>
      {Array.isArray(message) && message.map((msg, index) => <p key={index}>{msg}</p>)}
      <form onSubmit={handleSubmit} method="post">
        <label htmlFor="email">Email :</label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <label htmlFor="password">Mot de passe :</label>
        <input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default RegistrationUser;
