import React from 'react';
import ReactDOM from 'react-dom';

// import app from './fireConfig'
import App from './App';
import { BrowserRouter } from 'react-router-dom';


// const db = getDatabase(app)
// firebase.analytics();
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    
  </React.StrictMode>,
  document.getElementById('root')
);


