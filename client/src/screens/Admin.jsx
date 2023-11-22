import React from 'react'
import Credentials from "../contracts/Credentials.json";
import Web3 from "web3";
import { useNavigate, NavLink } from 'react-router-dom';
import { useState, useEffect } from "react";

export default function NotAvailable() {
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
    console.log(data1);
    setData1(data1);
  }

  return (
    <>
    <div>
        <div>Username:</div>
        <div>
          <input type='text' id="username" required='required'></input>
        </div>


        <div>ID:</div>
        <div>
          <input type='text' id="id" required='required'></input>
        </div>

        <div>Password:</div>
        <div>
          <input type='text' id="password" required='required'></input>
        </div>


        <button onClick={admin_readData} className="button button2">Submit</button>
      </div>
      <div>{data1}</div>
      </>
  )
}