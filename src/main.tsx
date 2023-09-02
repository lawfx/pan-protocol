import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from 'styled-components'
import { DARK_THEME } from './constants/constants.ts'
import GithubProvider from './components/GithubProvider/GithubProvider.tsx'
import UserDataProvider from './components/UserDataProvider/UserDataProvider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={DARK_THEME}>
      <GithubProvider>
        <UserDataProvider>
          <App />
        </UserDataProvider>
      </GithubProvider>
    </ThemeProvider>
  </React.StrictMode>
)
