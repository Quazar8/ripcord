import React from 'react'

import Navbar from './navbar/Navbar'

const App = () => {
    return (
        <div>
            <Navbar />
            <h1>Channel:</h1>
            <div className = "received-msg"></div>
            <label>
                Send:
                <input></input>
            </label>
        </div>
    )
}

export default App