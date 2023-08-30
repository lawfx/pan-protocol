import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from 'styled-components'
import { DARK_THEME } from './constants/constants.ts'
import GithubProvider from './components/GithubProvider/GithubProvider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={DARK_THEME}>
      <GithubProvider>
        <App />
      </GithubProvider>
    </ThemeProvider>
  </React.StrictMode>
)
