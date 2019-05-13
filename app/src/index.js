import '@babel/polyfill';

import React from 'react';
import { render } from 'react-dom';

import './css/normal.scss';

import Home from './pages/Home';

render(<Home />, document.getElementById('container'));

if (module.hot) {
  module.hot.accept();
}