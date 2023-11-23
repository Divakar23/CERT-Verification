import React from 'react'
import { useState, useEffect } from "react";
import Web3 from "web3";
import { useNavigate, NavLink } from 'react-router-dom';
import Valid from "../contracts/valid.json";


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
        setData(data);
    }
  return (
    <>
    <div>
        Enter Name:
      </div>
      <input type='text' id="Name" required='required'></input>
      <div>
        Enter ID:
      </div>
      <input type='text' id="ID" required='required'></input>
      
      <div>
        <button onClick={ValidCertificate}>Submit</button>
      </div>
      <div>
        {data}
      </div>
      <NavLink to='/login'>Back to Login Page</NavLink>
    </>
  )
}