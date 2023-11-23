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

async function writeData() {
  const { contract } = state;
  const username = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;
  await contract.methods
    .addCredentials(username, password)
    .send({ from: "0x28049C7500beBCEA77d0e75203776c1Ca64147e7", gas: 2000000 });
  navigate('/login')
  window.location.reload();
}


  return (
    <>
    <h1 style={{textAlign:'center'}}>Sign Up Page</h1>
    <div style={{textAlign:'center'}}>
        <div>New Username:</div>
        <div>
          <input style={{padding:'10px',borderRadius:'16px'}} type='text' id="username" required='required'></input>
        </div>


        <div>New Password:</div>
        <div>
          <input style={{padding:'10px',borderRadius:'16px'}} type='text' id="password" required='required'></input>
        </div>

        <div style={{padding:'10px'}}>
        <button style={{padding:'10px',borderRadius:'16px'}} onClick={writeData} className="button button2">Submit</button>
        </div>
      </div>
      </>
  )
}