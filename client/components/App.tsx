import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Navbar from './navbar/Navbar'

const App = () => {
    return (
        <BrowserRouter>
            <div>
                <Navbar />
                <h1>Channel:</h1>
                <div className = "received-msg"></div>
                <label>
                    Send:
                    <input></input>
                </label>
            </div>
        </BrowserRouter>
    )
}

export default App