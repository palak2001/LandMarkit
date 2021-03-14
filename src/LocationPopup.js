import React from 'react';
import { Component } from 'react';
//import About from '../About';
import {check} from './components/SendTransferForm.js';
import SendTransferForm from './components/SendTransferForm.js';
const desks = [
    {"111111":["1","2","3","4","5"]}, 
    {"224322":["6","7","13","14","0"]}, 
    {"133534":["12","11","8","10","9"]}
    ];

const details = new Map();

class PropertyDetail {

    constructor(propId,name,CNIC,owneradd, size,value,regDate,isAvailable){
        this.propId = propId;
        this.name = name;
        this.CNIC = CNIC;
        this.owneradd = owneradd;
        this.size = size;
        this.value = value;
        this.regDate = regDate;
        this.isAvailable = isAvailable;
    }

    // Get the property details.
     async getPropertyDetails(_propId){
        alert((details.get(_propId).name+details.get(_propId).CNIC+details.get(_propId).owneradd + details.get(_propId).size+details.get(_propId).value+details.get(_propId).regDate));
     }

     async retvalue(_propId){
            check(details.get(_propId).owneradd, details.get(_propId).value);
     }

}

let add='0x239DC13febBAB828F29047EDFB31961A9D39E51E';
details.set('0',(new PropertyDetail("0","ShimlaHouse",1234567890,add,1234,5,"10011001",true)));
details.set('1',(new PropertyDetail("1","ShimlaHouse",1234567890,add,1234,5,"10011001",true)));
details.set('2',(new PropertyDetail("2","ManaliHouse",1234435590,add,1424,5,"10033301",false)));
details.set('3',(new PropertyDetail("3","ShimlaHouse",1234567890,add,1234,5,"10011001",true)));
details.set('4',(new PropertyDetail("4","ManaliHouse",1234435590,add,1424,5,"10033301",false)));
details.set('5',(new PropertyDetail("5","ShimlaHouse",1234567890,add,1234,5,"10011001",false)));
details.set('6',(new PropertyDetail("6","ManaliHouse",1234435590,add,1424,5,"10033301",false)));

console.log(details.get('1').name);

const pincodeProperty = ['1','2','3'];
export default class Locationpopup extends React.Component {

    constructor(props){
        super(props);
        this.state={
            pincode : null
        };
    }

    async getProperties(){
        console.log("OKKKKKKKKKKKK");
        var pincode = document.getElementById('pincode').value;
        var properties = document.createElement('div');
        console.log(pincode);
        for (var i = 0; i < desks[0]; i++)
        {
            console.log(desks[1][i]);
        }
    
        for(let i in pincodeProperty){
            var property = document.createElement('button');
            property.innerHTML = pincodeProperty[i];
            property.addEventListener('click', function(){new PropertyDetail().getPropertyDetails(pincodeProperty[i])});
            properties.append(property);
            var buy = document.createElement('button');
            buy.innerHTML = "Buy"+pincodeProperty[i];
            buy.addEventListener('click',function(){new PropertyDetail().retvalue(pincodeProperty[i])});
            var canBuy = details.get(pincodeProperty[i]).isAvailable;
            console.log(canBuy);
            if(canBuy==true){
                properties.append(buy);
            }
            console.log("efdgbxfgbf"+i);
        }
        document.getElementById('properties').appendChild(properties);
    }
  render() {
    return (
        <div>
        <button className="danger" data-target="#locationPopup" data-toggle="modal">Get Started</button>
          <div className="modal" id="locationPopup">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h3 className="text-primary" id="text-primary">SignIn</h3>
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div className="modal-body" id="body-modal">
                    <input type="number" placeholder="Pincode" id="pincode"/>
                        <button id="listProperties" onClick = {(event)=> { 
               this.getProperties(event) 
               event.target.value=null
          }}>List Properties</button>
                    </div>
                </div>
            </div>
          </div>
        <div id="properties"></div>
    </div>
    );
  }
}