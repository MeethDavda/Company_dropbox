import React, { useEffect } from 'react'
import Web3 from 'web3';
import { useState } from "react";
import { uploadFileToIPFS } from "./pinata";
import DStorage from './DStorage.json';
import { ethers } from "ethers"



function App() {

  const [fileURL, setFileURL] = useState(null);
  const ethers = require("ethers");
  const [message, updateMessage] = useState('');
  const [account,setAccount] = useState(null);
  const [contract,setContract] = useState(null);

  const loadblockchaindata = async () => {
    //const provider = new ethers.providers.Web3Provider(window.ethereum);
    const key = 'https://polygon-mumbai.g.alchemy.com/v2/fy51OFKi78AkbKflZVtRfMk27JT1vByh';
    const provider = new ethers.providers.JsonRpcProvider(key);
    const signer = provider.getSigner();
    // const network = await provider.getNetwork()

    const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
    console.log(accounts);
    const address = '0x43b0eb79dc224d2194e8c442dfc2f973d5b4d5a275948214a8fba321d0757415';

    const storage = new ethers.Contract(address,DStorage,signer);
    setContract(storage);
    console.log(storage);
  }

  useEffect(() =>{
       loadblockchaindata()
  },[])
  // const [C ontract,setContract] = useState({})

  const web3Handler = async () => {
    // const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
    // console.log(accounts)
    // setAccount(account[0])
    // console.log(accounts)
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
          console.log(file);
          console.log(file.hash);
          // const address = ' 0x7e062dB6DEB1fF108A1FcDE7D6FEa5ca1FD00ffc';
          // const provider = new ethers.providers.JsonRpcProvider();
          // const signer = provider.getSigner();
          // const contract = new ethers.Contract(address, DStorage.abi, signer)
          const result = await contract.uploadFile(file.name,file.size,file.name,file.name,file.name);
          console.log(result)

      
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
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  