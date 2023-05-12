import React from 'react'
//import Web3 from 'web3';
import { useState } from "react";
import { uploadFileToIPFS } from "./pinata";
import DStorage from './DStorage.json';
//import { ethers } from "ethers"



function App() {

  const [fileURL, setFileURL] = useState(null);
  const ethers = require("ethers");
  const [message, updateMessage] = useState('');
  const [account,setAccount] = useState(null);
  // const [Contract,setContract] = useState({})

  const web3Handler = async () => {
    const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
    console.log(accounts)
    setAccount(account[0])
    console.log(accounts)
    // const provider = new ethers.providers.Web3Provider(window.ethereum)
    // const signer = provider.getSigner()
  
    window.ethereum.on('chainChanged',(chainId) =>{
      window.location.reload();
    })
  
    window.ethereum.on('accountsChanged', async function (accounts) {
      setAccount(accounts[0])
      await web3Handler()
    })
    // loadContracts(signer)
  }
  // const loadContracts = async (signer) => {
  //   const address = ' 0x5FbDB2315678afecb367f032d93F642f64180aa3';
  //   const contract = new ethers.Contract(address, DStorage.abi, signer)
  //   setContract(contract)
  
  
  // }
   const OnChangeFile= async(e) => {
          var file = e.target.files[0];
          const address = ' 0x7e062dB6DEB1fF108A1FcDE7D6FEa5ca1FD00ffc';
          const provider = new ethers.providers.JsonRpcProvider();
          const signer = provider.getSigner();
          const contract = new ethers.Contract(address, DStorage.abi, signer)
          const result = await contract.uploadFile(file.hash,file.size,file.type,file.name,{fileURL});
          console.log(result)

          console.log(file);
          console.log(file.hash);
          //check for file extension
          try {
              //upload the file to IPFS
              //disableButton();
              updateMessage("Uploading image.. please dont click anything!")
              const response = await uploadFileToIPFS(file);
              if(response.success === true) {
                  //enableButton();
                  updateMessage("")
                  console.log("Uploaded image to Pinata: ", response.pinataURL)
                  setFileURL(response.pinataURL);
                  console.log({message})
              }
          }
          catch(e) {
              console.log("Error during file upload", e);
          }
  
        }
  
  
  
    //   const GetIpfsUrlFromPinata = (pinataUrl) => {
    //     var IPFSUrl = pinataUrl.split("/");
    //     const lastIndex = IPFSUrl.length;
    //     IPFSUrl = "https://ipfs.io/ipfs/"+IPFSUrl[lastIndex-1];
    //     return IPFSUrl;
    // };
  
  
    return (<div>
  <input type={"file"} onChange={OnChangeFile}></input>  
  
  </div>
  )
  }
  
  
  export default App
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  