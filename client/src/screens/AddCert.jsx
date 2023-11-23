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

      const {contract} = state;
    async function addCertificate() {
      const Name=document.querySelector("#Name").value;
      const ID=document.querySelector("#ID").value;
      const CName=document.querySelector("#CName").value;
      const Org=document.querySelector("#Org").value;
      const ExDate=document.querySelector("#ExDate").value;
      await contract.methods.addUser(Name,ID,ExDate,CName,Org)
      .send({from:"0x33fdb7680320F831C5C8219056819E22Fb15c62D",gas:2000000});
      window.location.reload();
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
        Enter Course Name:
      </div>
      <input type='text' id="CName" required='required'></input>
      <div>
        Enter Organization:
      </div>
      <input type='text' id="Org" required='required'></input>
      <div>
        Enter Expiration date:
      </div>
      <input type='text' id="ExDate" required='required'></input>
      <div>
        <button onClick={addCertificate}>Submit</button>
      </div>
      <div>
        <NavLink to='/valid'>Validate Certificate</NavLink>
      </div>
    </>
  )
}