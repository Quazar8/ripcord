import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { StoreProvider } from '../store/store'

import Navbar from './navbar/Navbar'
import Main from './Main'
import NotificationsContainer from './others/notifications/NotificationsContainer'

const App = () => {
    return (
        <BrowserRouter>
            <StoreProvider>
                <div>
                    <Navbar />
                    <Main />
                    <NotificationsContainer />
                </div>
            </StoreProvider>
        </BrowserRouter>
    )
}

export default App