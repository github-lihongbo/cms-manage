import ReactDOM from "react-dom/client";
import Router from './router'
import './assets/base.css'

const root = ReactDOM.createRoot(
    document.getElementById('root')
)

root.render(
    <Router />
)