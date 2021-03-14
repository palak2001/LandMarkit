import React, { Component } from 'react';
import {web3,portis} from "../services/web3";

import {abi} from "../abi/Transaction.js";
import LocationPopup from '../LocationPopup.js';
const contractAddress = '0x645425Fafc7D412BFCd0BE222205fc77A6d75122';
const TransactionContract = new web3.eth.Contract(abi, contractAddress); 
var a='';

export function check(owneradd,val){
   // new SendTransferForm().sendTransfer(owneradd,val);
   alert(owneradd);
   // console.log(owneradd);
   // console.log(value);
}


export default class SendTransferForm extends Component {
   constructor(props) {
      super(props);
      this.state = {
         senderAddress: '',
         receiverAddress: '',
         amount: 1,
         senderBalance: 5,
         receiverBalance: 0,
         message: '',
      };
   }

   activateMenu(){
      portis.showPortis();
   }

   async sendTransfer(owneradd,value){
      // console.log(owneradd + value);
      // this.state.receiverAddress=owneradd;
      // this.state.amount=value;
      console.log(this.state.senderBalance);
      console.log("A");
      if(this.state.senderBalance>0){
         console.log("B");
         try{
            console.log("C");
            // console.log(owneradd + value);
            // let ownadd = owneradd;
            // this.state.receiverAddress=owneradd;
            // this.state.amount=value;
            // console.log(web3.utils.fromWei(await web3.eth.getBalance(this.state.receiverAddress)));
            // console.log(this.state.amount);
            console.log("try started");
            await TransactionContract.methods
               .transferFunds(this.state.receiverAddress)
               .send({
                  from:this.state.senderAddress,
                  value:web3.utils.toWei(
                     this.state.amount.toString(),
                     'ether'
                  )
               },
               (error,result)=>{
                  if(error){
                     console.log("I will give error");
                     this.setState({message:'error:'+error.message});
                  }
                  else{
                     this.setState({message:'transaction hash:'+result});
                  }
               }
               );
            }
         catch(error){
            console.log("try failed");
            this.setState({message:'the transfer has failed'});
         }
         
      }
   }

   async checkBalance(){
      let senderBalance=0;
      let receiverBalance=0;
      let message='';

      if(web3.utils.isAddress(this.state.senderAddress)) {
            senderBalance=web3.utils.fromWei(
                  await web3.eth.getBalance(this.state.senderAddress)
            );
      }
      else{
            message='Error: Incorrect etherum address for the sender';
      }

      if(this.state.receiverAddress){
            if(web3.utils.isAddress(this.state.receiverAddress)){
                  receiverBalance=web3.utils.fromWei(
                        await web3.eth.getBalance(this.state.receiverAddress)
                  );
            }
            else{
                  message = 'Error: Incoreect etherum address for the receiver';
            }
      }
      this.setState({senderBalance,receiverBalance,message});
}

   onChange(e) {
      this.setState({ [e.target.name]: e.target.value });
   }

   componentDidMount() {
      portis.onLogin((senderAddress)=>{
         this.setState({senderAddress});
         this.checkBalance();
      })

      portis.onActiveWalletChanged((senderAddress)=>{
         this.setState({senderAddress});
         this.checkBalance();
      })
   }

   render() {
      return (
         <div>
            <div className="row">
               <div className="nine columns smallTop">
                  {this.state.message && <b>{this.state.message}</b>}
               </div>
               <div className="three columns u-pull-right">
                  <button type="button" className="u-full-width" onClick={this.activateMenu}>
                     Portis Menu
                  </button>
               </div>
            </div>

            <form>
               <div className="row smallTop">
                  <div className="six columns">
                     <label>Sender Address</label>
                     <input
                        name="senderAddress"
                        value={this.state.senderAddress}
                        type="text"
                        className="u-full-width"
                        placeholder="Loading..."
                        disabled
                     />
                  </div>
                  <div className="six columns">
                     <label>Receiver Address</label>
                     <input
                        name="receiverAddress"
                        value={this.state.receiverAddress}
                        type="text"
                        className="u-full-width"
                        placeholder="Enter the receiver address"
                        required
                        onChange={this.onChange.bind(this)}
                     />
                  </div>
               </div>
               <div className="row">
                  <div className="six columns">
                     <label>Amount</label>
                     <input
                        name="amount"
                        value={this.state.amount}
                        type="text"
                        className="u-full-width"
                        placeholder="Amount to send"
                        required
                        onChange={this.onChange.bind(this)}
                     />
                  </div>
                  <div className="three columns">
                     <label>Sender Balance</label>
                     <p>{this.state.senderBalance} ETH</p>
                  </div>
                  <div className="three columns">
                     <label>Receiver Balance</label>
                     <p>{this.state.receiverBalance} ETH</p>
                  </div>
               </div>
               <div className="row">
                  <div className="six columns">
                     <button
                        type="button"
                        className="button-primary u-full-width"
                        disabled={!this.state.receiverAddress}
                        onClick={this.sendTransfer.bind(this)}
                     >
                        Transfer
                     </button>
                  </div>
                  <div className="six columns">
                     <button type="button" className="u-full-width" onClick={this.checkBalance.bind(this)}>
                        Check Balance
                     </button>
                  </div>
               </div>
            </form>
         </div>
      );
   }
}
