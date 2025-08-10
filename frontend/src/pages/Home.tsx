import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Home.css';

const Home: React.FC = () => {
  const { user } = useAuth();

  if (user) {
    // If user is logged in, redirect to dashboard
    window.location.href = '/dashboard';
    return null;
  }

  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Secure Notes</h1>
          <p className="hero-subtitle">
            Your thoughts, encrypted and secure. Create, edit, and store notes with military-grade encryption.
          </p>
          <div className="hero-buttons">
            <Link to="/register" className="btn-primary">
              Get Started
            </Link>
            <Link to="/login" className="btn-secondary">
              Login
            </Link>
          </div>
        </div>
      </div>
      
      <div className="features-section">
        <div className="container">
          <h2>Why Choose Secure Notes?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Client-Side Encryption</h3>
              <p>Your notes are encrypted in your browser before being sent to our servers. We never see your data.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📝</div>
              <h3>Markdown Support</h3>
              <p>Write your notes in Markdown with live preview support for rich formatting.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🏷️</div>
              <h3>Organization</h3>
              <p>Tag your notes and search through them easily to find what you need quickly.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Responsive Design</h3>
              <p>Access your notes from any device - desktop, tablet, or mobile.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
