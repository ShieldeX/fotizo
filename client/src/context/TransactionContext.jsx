import React, { useEffect, useState} from 'react';
import {ethers} from 'ethers';

import {contractABI, contractAddress } from '../utils/constants';


export const TransactionContext = React.createContext();

const{ ethereum } = window;



const getEthereumContract = () => {

    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);

        return transactionContract;
}

export const TransactionProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount  ] = useState('');
    const [ transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({addressTo:'', amount:'', keyword:'', message:''});

    const handleChange = (e, name ) => {

        setFormData((prevState) => ({...prevState, [name]: e.target.value}));
    }; 
    //transactionProviderChildren
    //connecting account
    //checking if account is connected
     
    const checkIfWalletIsConnected = async () => {

        try{
        
        if(!ethereum) return alert("Please intsall metatmask");

    const accounts = await ethereum.request ({method: "eth_accounts"});

        if(accounts.length){
            
        setCurrentAccount(accounts[0]); 
        }else{
            console.log("No accounts found ");


        }
    
        
        }catch(error){

            console.log(error);
            throw new Error ("no ethereum object.");
        }
    
        
    }
    

       //function for connecting the account    
    const connectWallet = async () => {
        try{
            if(!ethereum) return alert ("please install metamask extension");
    
    const accounts = await ethereum.request({method:'eth_requestAccounts'});
                
        setCurrentAccount(accounts[0]);
               
            
                
                
         } catch (error) {
            
            console.log(error);
            throw new Error ("no ethereum object.");  
             

        }
    }
     const sendTransaction = async () => {
    try {if(!ethereum) return alert("please install metamask");
    //get the data from the form 
   
    const {addressTo, amount, keyword, message} = formData;
        const transactionContract= getEthereumContract();
        const parsedAmount = ethers.utils.parseEther (amount);
        await ethereum.request({
            method:"eth_sendTransaction",
            params:[{
                from:currentAccount,
                to: addressTo, 
                gas:"0x5208",
                value:parsedAmount._hex,
            }] 
        })


        const transactionHash = await transactionContract.addToBlockchain   (addressTo, parsedAmount, message, keyword);  
         setIsLoading (true);
         console.log('loading-${transactionHash.hash}');
         await transactionHash.wait();
         setIsLoading (false);
         console.log('success-${transactionHash.hash}');

         const transactionCount = await transactionContract.getTransactionCount();

        setTransactionCount(transactionCount.toNumber());
    
        //get the data from the form 


    
    } catch (error) {
    console.log(error)
    throw new Error ("no ethereum object.");
    
}

     } 
     
              
 useEffect(() => {
    checkIfWalletIsConnected();
    setCurrentAccount();
    },[transactionCount]);

    return(
        <TransactionContext.Provider value= {{connectWallet, setCurrentAccount, formData, setFormData, handleChange, sendTransaction, transactionCount }} >
            {children}

        </TransactionContext.Provider>
    );

}