pragma solidity ^0.5.5;

contract Transaction{
      function transferFunds(address payable receiver) external payable{
            receiver.transfer(msg.value);
      }
      
}