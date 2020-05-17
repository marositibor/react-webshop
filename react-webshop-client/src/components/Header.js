import React,{
    Component
} from 'react'
import { Link } from "react-router-dom"
/* import logo from "../logo.png" */
import Cart from "./Cart"
import "./Header.css";



export default class Header extends Component {
    render() {
        return <div className="page-header">
            <div className="page-heading"><Link style={{ textDecoration: 'none',color: 'black' }} to='/'>{process.env.REACT_APP_HEADER}</Link></div>
            <Cart/>
        </div>
    }
}