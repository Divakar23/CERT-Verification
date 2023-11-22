import React from 'react'
import { useState, useEffect } from "react";
import Credentials from "../contracts/Credentials.json";
import Web3 from "web3";
import { useNavigate, NavLink } from 'react-router-dom';

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

async function admin_writeData() {
    const { contract } = state;
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;
    const id = document.querySelector("#id").value
    console.log(username + password);
    await contract.methods
      .adminaddCredentials(id, username, password)
      .send({ from: "0x33fdb7680320F831C5C8219056819E22Fb15c62D", gas: 2000000 });
    window.location.reload();
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


        <button onClick={admin_writeData} className="button button2">Submit</button>
      </div>
      </>
  )
}