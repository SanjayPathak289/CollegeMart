import React from 'react'
import App from './Components/App'
import './index.css'
import './Components/comp.css'
import '@radix-ui/themes/styles.css';
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client';
createRoot(document.getElementById("root")).render(
  <BrowserRouter>

    <App />

  </BrowserRouter>
)

