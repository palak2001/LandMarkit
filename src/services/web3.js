import Portis from "@portis/web3";
import Web3 from 'web3';

export const portis = new Portis('fff564f8-0ef8-4eb3-8a68-ec74bc7f711b',{
    nodeUrl: 'http://localhost:8545',
    chainId: 1,

});
export const web3 = new Web3(portis.provider);