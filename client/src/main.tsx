import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import BaseLayout from './BaseLayout.tsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './componenets/Login.tsx'
import AccountList from './componenets/AccountList.tsx'
import Profile from './componenets/Profile.tsx'
import { configureStore } from '@reduxjs/toolkit'
import reducer from './store/reducer.ts'
import { Provider } from 'react-redux'
import requireAuth from './requireAuth.tsx'


const store = configureStore({reducer})

const token = localStorage.getItem('token')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <Provider store={store}>
      <BaseLayout>
        <Routes>
          <Route path='/' Component={Login}/>
          <Route path='/accounts' Component={requireAuth(AccountList)}/>
          <Route path='/profile' Component={requireAuth(Profile)}/>
        </Routes>
        </BaseLayout>
        </Provider>
    </BrowserRouter> 
  </StrictMode>,
)
