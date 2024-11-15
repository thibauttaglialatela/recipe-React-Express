import React, { useState } from "react";
import { Navigate } from "react-router-dom";

const LoginUser = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [message, setMessage] = useState([]);
    const [redirect, setRedirect] = useState(false);
  
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })

            if (!response.ok) {
                const errorData = await response.json();
                console.error("mes erreurs: ",errorData);
                setMessage(Array.isArray(errorData.message) ? errorData.message : [errorData.message]);
                return;
            }

            setRedirect(true);
            
    
        } catch (error) {
          console.error("Erreur de requête: ", error);
          setMessage("Erreur lors de la connexion");
            
        }

        
    }
    if (redirect) return <Navigate replace to="/" />;
    return (
        <>
        <h1>Login form</h1>
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
          <button type="submit">Login</button>
        </form>

        {Array.isArray(message) && message.map((msg, index) => <p className="error" key={index}>{msg}</p>)}
      </>
    )

}

export default LoginUser;