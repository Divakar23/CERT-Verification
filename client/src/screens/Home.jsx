import React from 'react'
import { useState, useEffect } from "react";
import { useNavigate, NavLink,Link } from 'react-router-dom';

export default function NotAvailable() {
  return (
    <>
    <h1 style={{color: "227, 85, 8", textAlign: 'center', marginTop: 10 }} > Home Page</h1>

    <div style={{textAlign:'center', marginBottom:'20px'}}>
    <Link  to="/login" className='a'>
      Login as user
      </Link>
    </div>
    
    <div style={{textAlign:'center'}}>
    <Link  to="/admin" className='a' >
      Login as admin
      </Link>
    </div>

    </>
  )
}