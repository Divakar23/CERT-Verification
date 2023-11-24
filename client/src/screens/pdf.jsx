import React from 'react'
import { useNavigate, NavLink } from 'react-router-dom';
import Credentials from "../contracts/valid.json";
import Web3 from "web3";
import { useState, useEffect,Link } from "react";
import downloadjs from 'downloadjs';
import html2canvas from 'html2canvas';


export default function NotAvailable(){

    const navigate = useNavigate();
  const [state, setState] = useState({
    web3: null,
    contract: null,
  });
  const [data, setData] = useState("nill");
  const [data1, setData1] = useState("nill");
  const [data2,setData2]=useState("nill");
  const [data3,setData3]= useState("nill");
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
    const { contract }= state;
    async function getDetails(){
        const id=document.querySelector("#id").value;
        const data=await contract.methods.getHash(id).call();
        const data2=await contract.methods.getName(id).call();
        const data3=await contract.methods.getCourse(id).call();
        setData(data);
        setData2(data2);
        setData3(data3);
    }



    const download_pdf= async()=> {

        let element=document.getElementById("whole_certificate");
        element.style.visibility="visible";
        let name_element=document.getElementById("name_of_user");
        name_element.innerHTML=data2;
        let course_element=document.getElementById("course_name");
        course_element.innerHTML=data3;
        let  hash_number_element=document.getElementById("hash_number");
        hash_number_element.innerHTML=data;
       const canvas=await html2canvas(document.getElementById("certificate"));
       const dataurl=canvas.toDataURL('image/png');
       downloadjs(dataurl,'download.png','image/png');
   };

    return(
        <>
        <div style={{textAlign:'center'}}>
            <h1>Get Certificate from the blockchain</h1>
        <div className='text'>
            Enter the Certificate ID:
        </div>
        <input style={{padding:'10px',borderRadius:'16px'}} type='text' id='id' required></input>
        <div style={{textAlign:'center',padding:'10px'}}>
        <button onClick={getDetails} id="Submit">Submit</button>
        <button  onClick={download_pdf} id="Submit">download</button>
        </div>
        <NavLink to='/valid'>Go back to Validate</NavLink>
        </div>
        <center id="whole_certificate" style={{visibility:'hidden'}}>
        <center id="certificate" style={{padding:5+'rem'}}>
    <div style={{width: 30+'rem',height: 17.5+'rem', backgroundColor:'#daf4f5'}}>
        <header style={{backgroundColor:'slateblue',height:3.5+'rem'}}></header>
        <center style={{padding:1+'rem'}}> <div style={{fontFamily: 'Brush Script MT, cursive',fontSize:1.35+'rem'}}>This certificate is presented to<br/>
            <div id="name_of_user" style={{fontSize: 'Cambria', fontSize:1.5+'rem'}}>placeholder</div>
            <div>for the successful completion of the course</div>
            <div id="course_name" style={{fontFamily:'Gill Sans',fontSize:1.4+'rem'}} ></div>
            <div style={{fontFamily:'sans-serif',fontSize:0.7+'rem'}}>
              <br/>
            Certificate UID: <div id="hash_number" style={{fontWeight: 700,display:'inline'}}></div>
        </div></div></center>
    </div>
</center>
</center>
        </>
    );
}