import React from 'react'
import { render } from 'react-dom'

import App from './components/App'

import './styles/index.scss'

render(
    <App />
, document.getElementById('root'));

(module as any).hot.accept((err: Error) => {
    window.location.reload()
})