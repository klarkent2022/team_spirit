import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { StateContextProvider } from "./context";
import { KlaytnCypress } from "@thirdweb-dev/chains";
import { ThirdwebProvider, useContract } from "@thirdweb-dev/react";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThirdwebProvider activeChain={ KlaytnCypress }>
      <StateContextProvider>
        <App />
      </StateContextProvider>
    </ThirdwebProvider>
  </React.StrictMode>,
)
