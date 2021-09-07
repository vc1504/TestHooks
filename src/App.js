import { useEffect, useState } from 'react';
import { Web3JS } from "./Component/Web3JS";
import { Button } from "./Component/Button";
import { Label } from './Component/Label';

function App() {

  const web3 = Web3JS();
  const [userAccount, setUserAccount] = useState(undefined);
  const [userBalance, setUserBalance] = useState(undefined);
  const [netWorkId, setNetWorkId] = useState(undefined);
  const [doNetWorkChange, setDoNetWorkChange] = useState(false);

  const getUserAccount = async () =>{    
      web3.eth.getAccounts().then(accounts => {
        setUserAccount(accounts[0]);
        getUserBalance(accounts[0])
      });
  }

  const getUserBalance = async (address) =>{
    await web3.eth.getBalance(address).then(value =>{
      setUserBalance(web3.utils.fromWei(value,'ether'));
    })
  }

  useEffect(() => {
    const load = async () =>{
      if(window.ethereum){
        await window.ethereum.enable().then(handleNetWorkChanged());    
        updateNetWork();     
      } else {
        console.error("Metamask not available");
      }
    }
    load();    
  }); 

  const handleNetWorkChanged = () =>{
      window.ethereum.on('chainChanged', _chainId => updateNetWork());
  }

  const updateNetWork = async () =>{
    const networkIds = await web3.eth.net.getId();
    setNetWorkId(networkIds);
    if(networkIds!==42){
      setDoNetWorkChange(true);
    }
    else{
      setDoNetWorkChange(false);
    }
    getUserAccount();
  }
  const handleClick = async () => {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x2a' }],
    });
  }

  return (
    <div className="App">
      { doNetWorkChange ? 
            <div>
            <Label text="You are not on Kovan network. Please Click Switch Network."/>
            <Button classname="btn" onclick={handleClick} label="Switch Network"></Button>
            </div> :
            <div> <p>Account ID : {userAccount}</p>
                  <p>User Balance : {userBalance}</p>
                  <p>Network Id : {netWorkId}</p> 
            </div>
      }     
    </div>
  );
}

export default App;
