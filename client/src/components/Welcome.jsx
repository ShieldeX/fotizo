import React, {useContext} from 'react';
import {AiFillPlayCircle} from 'react-icons/ai';
import {SiEthereum} from 'react-icons/si';
import {BsInfoCircle} from 'react-icons/bs';


import{TransactionContext } from '../context/TransactionContext';

import {Loader} from './';
const commonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

const Input=({placeholder, name, type, value, handleChange})=>(
    <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={(e)=> handleChange(e, name)}
    className="my-2 w-full rounded p-2 outline-none bg-transparent text-sky-700 text-sm white-glassmorphism border-none border-none hover:bg-red-200 hover:cursor-pointer"
    
    />
);

const   Welcome = () => {
  const { connectWallet, currentAccount, formData, sendTransaction, handleChange,setFormData } = useContext(TransactionContext);
    const handleSUBMIT = (e, name) =>{
        const {addressTo, amount, keyword, message} = formData;

        e.preventDefault();

        if(!addressTo || amount || message || keywaord) return;

        sendTransaction();


        

    }
    return (
       <div className='flex w-full justify-center item-center'>
           <div className='flex md:flex-row flex-col items-start justify-between  md:p-20 py-12 px-4'>
                <div className='flex flex-1  justify-start flex-col md:mr-10'>
                    <h1 className='text-3xl sm:text-5xl text-white text-gradient py-1'>
                        Send Crypto <br/> accross the world 
                    </h1>
                    <p className='text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base '>
                        Explore the Crypto world. Buy and Sell cryptocurrencies easily on coinmarketcap . 
                    </p>
                      {!currentAccount && (
                    <button  type= "button"  onClick={connectWallet} 
                            className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer
                            hover:bg[#2546bd]" >
                             <p className='text-white text-base font-bold'>   Connect Wallet </p>


                    </button>
                      )}
                   <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10" >
                       <div className={'rounded-tl-2xl rounded-bl-2xl  min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white'}>
                            Solana
                       </div> 
                       <div className={commonStyles}> BabyDoge

                       </div>
                       <div className={'rounded-tr-2xl rounded-br-2xl  min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white'}>
                            Ethereum
                       </div> 

                       </div> 

                </div>
                <div className='flex flex-col flex-1 items-center justify-start w-full md:mt-0 mt-10'>
                    <div className='p-3 justify-end item-start flex-col rounde-xl h-40 sm:w-72 w-full my-5 eth-card white-glassmorphism hover:bg-violet-600'>
                        <div className='flex justify-between flex-col w-full h-full '>
                            <div className='flex justify-between item-start'>
                                <div className='w-10 h-10 rounded-full border-8 border-gradient flex justify-center item-center hover:bg-fuchsia-600 '>
                                    <SiEthereum fontSize={22} color = "#fff"/>
                                </div>
                                < BsInfoCircle fontSize={17} color="#fff" />
                                <div>
                                    <p className='text-white font-light text-sm font-semibold '
                                    >
                                     Adrress: 0x34yer6q.....  

                                    </p>
                                    <p className='text-white font-light text-lg font-semibold mt-20 mx-0 pl-5  '
                                    >
                                     Ethereum  

                                    </p>
                                   


                                </div>
                                
                            </div>

                         
                    </div>
                    </div>
                        <div className='p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism'>
                            <Input placeholder='addressTo' name="addressTo" type="text" handleChange={handleChange}  />
                            <div className='h-[5px] w-full bg-gray-400 my-2'/>
                            <Input placeholder='Amount(ETH)' name="amount" type="number" handleChange={handleChange}  />
                            <Input placeholder='Keyword(gif)' name="keyword" type="text" handleChange={handleChange}  />
                            <Input placeholder='Enter Message' name="message" type="text" handleChange={handleChange}  />

                            <div className='h-[1px] w-full bg-gray-400 my-2'/>

                            {false ?(
                               <Loader/>
                            ) : (
                                <button 
                                type="button"
                                onClick={handleSUBMIT}
                                className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointerover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 "
                                >
                                    Send Now
                                </button>

                                    
                            )}

                           
                        </div>
                </div>
           </div>

       </div>
    );
}

export default Welcome;