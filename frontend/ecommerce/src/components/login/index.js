import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../authContext'; // Replace with the correct path to your AuthContext file
import './index.css';
import BackImage from '../../assets/images/BLUBERRI.jpg';

const LoginPage = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("response login", data);

        if (data.role === 'admin') {
          console.log('Navigating to dashboard...');
          navigate('/dashboard');
        } else {
          console.log('Navigating to home...');
          navigate('/');
        }

        
        authContext.login(data.user, data.role, data.token);
      } else {
        console.error('Authentication failed:', response.status);
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="container mt-5" style={{ backgroundImage: `url(${BackImage})` }}>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card1">
            <div className="card-header">Login</div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </form>
              <p className="mt-3">
                Not registered? <Link to="/register">Sign Up</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;