import { useState, useEffect } from "react";
import { Route, Routes } from 'react-router-dom';
import Credentials from "./contracts/Credentials.json";
import Web3 from "web3";
import "./App.css";

import Home from "./screens/Home"
import Admin from "./screens/Admin"
import Login from "./screens/Login"
import NotFound from "./screens/NotFound"
import SignUp from "./screens/SignUp"


function App() {
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
    const nusername = document.querySelector("#nusername").value;
    const npassword = document.querySelector("#npassword").value;
    const data = await contract.methods.VerifyCredentials(nusername, npassword).call();

    setData(data);
  }
  async function admin_readData() {
    const nusername = document.querySelector("#nusername").value;
    const npassword = document.querySelector("#npassword").value;
    const nid = document.querySelector("#aid").value;
    const data1 = await contract.methods.adminVerifyCredentials(nusername, npassword, nid).call();
    console.log(data1);
    setData1(data1);
  }

  async function writeData() {
    const { contract } = state;
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;
    console.log(username + password);
    await contract.methods
      .addCredentials(username, password)
      .send({ from: "0x33fdb7680320F831C5C8219056819E22Fb15c62D", gas: 2000000 });
    window.location.reload();
  }

  async function admin_writeData() {
    const { contract } = state;
    const username = document.querySelector("#avusername").value;
    const password = document.querySelector("#avpassword").value;
    const id = document.querySelector("#avid").value
    console.log(username + password);
    await contract.methods
      .adminaddCredentials(id, username, password)
      .send({ from: "0x33fdb7680320F831C5C8219056819E22Fb15c62D", gas: 2000000 });
    window.location.reload();
  }


  return (
    <>
      <Routes> {/*For handling routes*/}
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
    // <>
    //   <div>
    //     <div>Username:</div>
    //     <div>
    //       <input type='text' id="username" required='required'></input>
    //     </div>


    //     <div>Password:</div>
    //     <div>
    //       <input type='text' id="password" required='required'></input>
    //     </div>


    //     <button onClick={writeData} className="button button2">Submit</button>
    //   </div>

    //   <div>
    //     <div>Username:</div>
    //     <div>
    //       <input type='text' id="nusername" required='required'></input>
    //     </div>


    //     <div>Password:</div>
    //     <div>
    //       <input type='text' id="npassword" required='required'></input>
    //     </div>
    //     <div>{data}</div>

    //     <button onClick={readData} className="button button2">Submit</button>
    //   </div>
    //   <div>
    //   <div>Admin Username:</div>
    //     <div>
    //       <input type='text' id="avusername" required='required'></input>
    //     </div>
    //     <div>Admin ID:</div>
    //     <div>
    //       <input type='text' id="avid" required='required'></input>
    //     </div>

    //     <div>Admin Password:</div>
    //     <div>
    //       <input type='text' id="avpassword" required='required'></input>
    //     </div>


    //     <button onClick={admin_writeData} className="button button2">Submit</button> 
    //     </div>
    //     <div>
    //   <div>Admin Username:</div>
    //     <div>
    //       <input type='text' id="ausername" required='required'></input>
    //     </div>
    //     <div>Admin ID:</div>
    //     <div>
    //       <input type='text' id="aid" required='required'></input>
    //     </div>

    //     <div>Admin Password:</div>
    //     <div>
    //       <input type='text' id="apassword" required='required'></input>
    //     </div>


    //     <button onClick={admin_readData} className="button button2">Submit</button>
    //     <div>{data1}</div>
    // </div>
    // </>
  );
}

export default App;