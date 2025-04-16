import React, {useState} from 'react'

const SignIn = () => {
  const [formData, setformData] = useState({
    email:'',
    password: ''
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setformData({...formData, [name]: value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login Sumbitted:", formData);
  };


  return (
    <div className="login-container">
      <h2>Log In</h2>

      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}    
          required      
          
          />

        </label>

        <label >
          Password:
          <input type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          />

        </label>
        <button type="submit">LogIn</button>




      </form>

    </div>
  )
}

export default SignIn