import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App'
import history from './Movies/history';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <Router history = {history}>
    <App />
  </Router>,
  document.getElementById('root')
);
