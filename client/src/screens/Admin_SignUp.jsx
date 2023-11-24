import React from 'react'
import { useState, useEffect } from "react";
import Credentials from "../contracts/Credentials.json";
import Web3 from "web3";
import { useNavigate, NavLink, Navigate } from 'react-router-dom';

export default function NotAvailable() {
  const navigate = useNavigate();
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

async function admin_writeData() {
    const { contract } = state;
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;
    const id = document.querySelector("#id").value;
    await contract.methods
      .adminaddCredentials(id, username, password)
      .send({ from: "0x79907B1Db3B8F3d9c473FC085047E6D3d7F557b6", gas: 2000000 });
    navigate('/admin');
    
  }


  return (
    <>
    <div style={{textAlign:'center'}}>
      <div>
        <h1>Sign up page for admin</h1>
      </div>
        <div className='text'>Username:</div>
        <div>
          <input style={{padding:'10px',borderRadius:'16px'}} type='text' id="username" required='required'></input>
        </div>


        <div className='text'>ID:</div>
        <div>
          <input style={{padding:'10px',borderRadius:'16px'}} type='text' id="id" required='required'></input>
        </div>

        <div className='text'>Password:</div>
        <div>
          <input style={{padding:'10px',borderRadius:'16px'}} type='text' id="password" required='required'></input>
        </div>


        <button onClick={admin_writeData} id="Submit">Submit</button>
      </div>
      </>
  )
}