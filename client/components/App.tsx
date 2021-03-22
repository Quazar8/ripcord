import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import Navbar from './navbar/Navbar'
import Main from './Main'

const App = () => {
    return (
        <BrowserRouter>
            <div>
                <Navbar />
                <Main />
            </div>
        </BrowserRouter>
    )
}

export default App