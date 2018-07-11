import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './components';
import 'bootstrap';
import dataSet from './data/data01.json';

render((
  <BrowserRouter>
    <App dataSet={dataSet} />
  </BrowserRouter>
), document.getElementById('root'));
