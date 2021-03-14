import React from 'react';
import SendTransferForm from './components/SendTransferForm';

import './css/normalize.css';
import './css/skeleton.css';
import './App.css';
import Home from "./Home.js";
import Locationpopup from "./LocationPopup.js";
export default function App() {
   return (
      <div className="App container">
            <Locationpopup/>
            <header>
               <h1>Ethereum Transfer</h1>
            </header>
            <SendTransferForm />
      </div>
      
   );
}
