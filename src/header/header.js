import React from "react";
import './header.css'
import logo from './logo.jpg'



class Header extends React.Component {
  render(){
    return (
      <div className="header">
        <img src={logo} alt="logo pokebola" height={60} width={60}/>
      </div>
      
    );
  }
}

export default Header;