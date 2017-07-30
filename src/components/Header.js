import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import LogoutButton from './LogoutButton'
import LoginButton from './LoginButton'
import ReactBootstrap from 'react-bootstrap';
import { PageHeader } from 'react-bootstrap';




class Header extends Component {
  logInOrLogout() {
    if(this.props.loggedIn) {
      return <LogoutButton logout={this.props.logout} />
    }
    else {
      return <LoginButton />
    }
  }

  render() {
    return (
  <header>
      <PageHeader>CodeSores</PageHeader>
  <nav>
      <ul>
        <li>
        { this.logInOrLogout() }
        </li>
        <li><Link to='/'>Home</Link></li>
      </ul>
    </nav>
  </header>
    )
  }
}


export default Header
