import React from 'react';
import { NavLink } from 'react-router-dom';
import "./Home.css";

function Navbar() {
  return (
    <nav className='nav-bar'>
      <ul>
        <li><NavLink to="/auth" ClassName="active">Weather App</NavLink></li>
        <li><NavLink to="/login" ClassName="active">Login</NavLink></li>
        <li><NavLink to="/crud" ClassName="active">Blog Posts</NavLink></li>
      </ul>
    </nav>
  );
}

function Footer() {
  return (
    <footer>
      <p>&copy; 2024 MyWebsite. All rights reserved.</p>
    </footer>
  );
}

function HomePage() {
  return (
    <div>
      <Navbar />
      <h1>Welcome to Weather Daily by Sophie!</h1>
      <p>"Explore beyond the forecast with our captivating blog posts, sharing your thoughts and enriching your weather experience!"</p>
      
      <Footer />
    </div>
  );
}

export default HomePage;
