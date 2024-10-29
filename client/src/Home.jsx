import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import './css/Home.css';

const Home = () => {
    const [items, setItems] = useState([]);
    const [role, setRole] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Fetching the role of the user
        axios.get('/api/userRole')
            .then(response => {
                setRole(response.data.role);
                if (response.data.role === 'admin') {
                    navigate('/admin'); // Redirect admin to admin dashboard
                }
            })
            .catch(error => console.error('Error fetching role:', error));

        // Fetching items in the inventory
        axios.get('/api/inventory')
            .then(response => setItems(response.data))
            .catch(error => console.error('Error fetching items:', error));
    }, [navigate]);

    const handleSignOut = () => {
        localStorage.removeItem('token'); // Clear token on sign out
        navigate('/login');
    };

    const filteredItems = Array.isArray(items)
        ? items.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
        : [];

    return (
        <div className="home-container">
            <Navbar role={role} onSignOut={handleSignOut} />

            <section className="hero-section">
                <h1>Welcome to Inventory Management</h1>
                <p>Manage your items effectively and efficiently</p>
                {role === 'customer' && <button onClick={() => fetchCustomerData()}>Get Customer Data</button>}
                {role === 'guest' && <p>Sign up or log in to access full features.</p>}
                {role === 'admin' && <p>Admin Panel - Full Access</p>}
            </section>

            <div className="search-container">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search items..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <ul className="item-list">
                {filteredItems.map(item => (
                    <li key={item.id} className="item">
                        {item.name}
                    </li>
                ))}
            </ul>
            <Footer />
        </div>
    );
};

export default Home;
