import React from 'react'
import { useNavigate, NavLink } from 'react-router-dom';
import Credentials from "../contracts/Credentials.json";
import Web3 from "web3";
import { useState, useEffect,Link } from "react";

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

  const { contract } = state;
  async function readData() {
    const nusername = document.querySelector("#username").value;
    const npassword = document.querySelector("#password").value;
    const data = await contract.methods.VerifyCredentials(nusername, npassword).call();

    setData(data);

    if(data === "true"){
      navigate('/valid')
    }
    else{
      window.alert("Enter correct username and password");
    }
  }

    return (
        <>
    <div style={{textAlign:'center'}}>
      <div>
        <h1>
          Login Page for Users
        </h1>
      </div>
        <div>Username:</div>
        <div>
          <input style={{padding:'10px',borderRadius:'16px'}} type='text' id="username" required='required'></input>
        </div>


        <div>Password:</div>
        <div>
          <input style={{padding:'10px',borderRadius:'16px'}} type='text' id="password" required='required'></input>
        </div>


        <button onClick={readData} className="button button2">Submit</button>

        <div>
          <NavLink to='/signup'>Create a new account</NavLink>
        </div>


        <div>
          <NavLink to='/'>Go back to home page</NavLink>
        </div>
      </div>

      
      
      </>
    )
}