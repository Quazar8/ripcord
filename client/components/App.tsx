import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import Navbar from './navbar/Navbar'
import Main from './Main'
import NotificationsContainer from './others/notifications/NotificationsContainer'

const App = () => {
    return (
        <BrowserRouter>
            <div>
                <Navbar />
                <Main />
                <NotificationsContainer />
            </div>
        </BrowserRouter>
    )
}

export default App