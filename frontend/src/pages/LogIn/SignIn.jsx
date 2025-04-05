import React, {useState} from 'react'

const SignIn = () => {
  const [formData, setformData] = useState({
    email:'',
    password: ''
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setformData

  }
  return (
    <div>SignIn</div>
  )
}

export default SignIn