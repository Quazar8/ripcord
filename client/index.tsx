import React from 'react'
import { render } from 'react-dom'

import App from './components/App'
import { StoreProvider } from './store/store'

import './styles/index.scss'

render(
    <StoreProvider>
        <App />
    </StoreProvider>
, document.getElementById('root'));

(module as any).hot.accept((err: Error) => {
    window.location.reload()
})