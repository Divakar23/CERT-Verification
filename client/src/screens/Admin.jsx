import React from 'react'
import Credentials from "../contracts/Credentials.json";
import Web3 from "web3";
import { useNavigate, NavLink } from 'react-router-dom';
import { useState, useEffect } from "react";

export default function NotAvailable() {
    const navigate=useNavigate();
    const [state, setState] = useState({
        web3: null,
        contract: null,
      });
      const [data, setData] = useState("nill");
      const [data1, setData1] = useState("nill");
      useEffect(() => {
        const provider = new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545");
    
        async function template() {
          const web3 = new Web3(provider);
          const networkId = await web3.eth.net.getId();
          const deployedNetwork = Credentials.networks[networkId];
          const contract = new web3.eth.Contract(
            Credentials.abi,
            deployedNetwork.address
          );
          setState({ web3: web3, contract: contract });
    }
    provider && template();
  }, []);
  const { contract }=state;
  async function admin_readData() {
    const nusername = document.querySelector("#username").value;
    const npassword = document.querySelector("#password").value;
    const nid = document.querySelector("#id").value;
    const data1 = await contract.methods.adminVerifyCredentials(nusername, npassword, nid).call();
    if(data1 === 'true'){
      navigate('/add')
    }
    else{
      window.alert('Enter correct username and password');
    }
    setData1(data1);
  }

  return (
    <>
    <div style={{textAlign:'center'}}>
      <div>
        <h1>Admin Login Page</h1>
      </div>
        <div>Username:</div>
        <div>
          <input style={{padding:'10px',borderRadius:'16px'}} type='text' id="username" required='required'></input>
        </div>


        <div>ID:</div>
        <div>
          <input style={{padding:'10px',borderRadius:'16px'}} type='text' id="id" required='required'></input>
        </div>

        <div>Password:</div>
        <div>
          <input style={{padding:'10px',borderRadius:'16px'}} type='text' id="password" required='required'></input>
        </div>

        <div style={{margin:'10px'}}>
        <button onClick={admin_readData} className="button button2">Submit</button>
        </div>
      </div>
      <div style={{textAlign:'center'}}></div>

      <div style={{textAlign:'center'}}>
          <NavLink to='/asignup'>Create a new admin account</NavLink>
        </div>
      </>
  )
}