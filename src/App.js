import { React, useState } from 'react';
import { ethers } from 'ethers';
import Counter from './artifacts/contracts/Lock.sol/Lock.json';
import "./App.css"; 

const counterAddress = '0x5fbdb2315678afecb367f032d93f642f64180aa3';



export default function SimpleCounter() {

  const [counter, setCounterValue] = useState("0");

  // request access to the user's MetaMask account
  async function requestAccount() {
    console.log('Requesting account...'); 
  }

  // call the smart contract, read the current counter value
  async function fetchCounter() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(counterAddress, Counter.abi, provider)
      try {
        const data = await contract.counter()
        console.log('data: ', data)
      } catch (err) {
        console.log("Error: ", err)
      }
    }
  }
  
  // call the smart contract, send an update
  async function setCounter() {
    if (!counter) return
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner()
      const contract = new ethers.Contract(counterAddress, Counter.abi, signer)
      const transaction = await contract.setCounter(counter)
      await transaction.wait()
      fetchCounter()
    }
  }

    //increase counter
    const increase = () => {
      setCounter(count => count + 1);
    };
  
    //decrease counter
    const decrease = () => {
      setCounter(count => count - 1);
    };
  
    //reset counter 
    const reset = () =>{
      setCounter(0)
    }
  
 
  return (
    <div className="counter">
      <h1>React Counter</h1>
      <span className="counter__output">{counter}</span>
      <div className="btn__container">
        <button className="control__btn" onClick={increase}>+</button>
        <button className="control__btn" onClick={decrease}>-</button>
        <button className="reset" onClick={reset}>Reset</button>
      </div>
    </div>
  );
}