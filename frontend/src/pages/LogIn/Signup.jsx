import React,  { useState } from 'react'

const Signup = () => {
  const [formData, setformData] = useState({
    name: '',
    email: '',
    password: ''

  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setformData({...formData, [name]: value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted', formData);
  };




  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input 
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required/>
        </label>

        <label>
          Email:
          <input 
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required/>
        </label>

        <label>
          Password:
          <input 
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required/>
        </label>

        <button type="submit">Sign Up</button>


      </form>

    </div>
  )
}

export default Signup