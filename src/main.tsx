import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import GithubProvider from './components/GithubProvider/GithubProvider.tsx';
import UserDataProvider from './components/UserDataProvider/UserDataProvider.tsx';
import ThemeProvider from './components/ThemeProvider/ThemeProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <GithubProvider>
        <UserDataProvider>
          <App />
        </UserDataProvider>
      </GithubProvider>
    </ThemeProvider>
  </React.StrictMode>
)
