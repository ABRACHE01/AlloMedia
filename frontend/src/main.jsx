import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { store } from './app/store';
import { Provider } from 'react-redux';
import './index.css'
import {NextUIProvider} from "@nextui-org/react";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <NextUIProvider>
    <Provider store={store}>
    <App />
    </Provider>
  </NextUIProvider>
  </React.StrictMode>,
)
