import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeAndFormContextProvider } from './store/ThemeAndForm-context.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeAndFormContextProvider>
    <App />
    </ThemeAndFormContextProvider>
  </React.StrictMode>,
)
