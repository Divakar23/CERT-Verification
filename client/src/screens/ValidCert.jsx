import React from 'react'
import { useState, useEffect } from "react";
import Web3 from "web3";
import { useNavigate, NavLink } from 'react-router-dom';
import Valid from "../contracts/valid.json";
import "../App.css"


export default function NotAvailable() {
    const [state, setState] = useState({
        web3: null,
        contract: null,
      });
      const [data, setData] = useState("nill");
    
      useEffect(() => {
        const provider = new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545");
    
        async function template() {
          const web3 = new Web3(provider);
          const networkId = await web3.eth.net.getId();
          const deployedNetwork = Valid.networks[networkId];
          const contract = new web3.eth.Contract(
            Valid.abi,
            deployedNetwork.address
          );
          setState({ web3: web3, contract: contract });
        }
        provider && template();
      }, []);
      const { contract } = state;
      async function ValidCertificate(){
        const nName=document.querySelector("#Name").value;
        const nID=document.querySelector("#ID").value;
        const data=await contract.methods.checkUser(nName,nID).call();
        console.log(data)
        if(data === "legit"){
          window.alert("Certificate Exists");
        }
        else{
          window.alert("Certificate does not exist");
        }
        setData(data);
    }
  return (
    <>
    <div style={{textAlign:'center'}}>
      <div>
        <h1>Verify the certificate</h1>
      </div>
      <div>
        Enter Name:
      </div>
      <input style={{padding:'10px',borderRadius:'16px'}} type='text' id="Name" required='required'></input>
      <div>
        Enter ID:
      </div>
      <input style={{padding:'10px',borderRadius:'16px'}} type='text' id="ID" required='required'></input>
      
      <div style={{display:'block',padding:'20px'}}>
        <button onClick={ValidCertificate} id="Submit">Submit</button>
      </div>
      
      <NavLink to='/' style={{display:'block'}}>Back to Home Page</NavLink>
      <NavLink to='/pdf' style={{display:'block'}}>Download the Certificate</NavLink>
    </div>
    </>
  )
}
