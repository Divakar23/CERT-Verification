import React from 'react'
import { useNavigate, NavLink } from 'react-router-dom';

export default function NotAvailable() {
    const navigate = useNavigate();

    const xyz = () => {
        navigate('/signup');
        return;
    }

    return (
        <>
            <h1 style={{ color: "227, 85, 8", textAlign: 'center', marginTop: 150 }} > Login</h1>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '5px',
            }}>
                <NavLink to="/" >Go to Home</NavLink>
                <button onClick={xyz}>Go to Signup (via function call)</button>
            </div>
        </>
    )
}