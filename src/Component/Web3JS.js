import Web3 from "web3";

export const Web3JS = () =>{
    
        var web3element;
        if(window.ethereum){
            try{
            web3element = new Web3(window.ethereum);
            } catch (err){
                console.error(err);
            }
        } else if(window.web3){
            web3element= new Web3(window.web3);
        }
        else{
            console.error("Metamask not available");
        }
        
        return web3element;
}