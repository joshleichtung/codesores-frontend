import React, { Component } from 'react'
import Button from 'react-toolbox/lib/button/Button';
import GithubIcon from './GithubIcon';

const authorizeUrl = 'https://github.com/login/oauth/authorize'
const clientId = '8515e9a1dcd00ca18123'
const scope = 'user:email'

class LoginButton extends Component {
  render() {
    if(this.props.token) {
      return (
        <Button
            raised
            accent
          >
          Start searching!
        </Button>
      )
    } else {
    return (
      <Button
          raised
          accent
          href={`${authorizeUrl}?client_id=${clientId}&scope=${scope}`}
        >
        <GithubIcon />
        {' '}
        Sign in with GitHub
      </Button>
    )};
  }
}

export default LoginButton;
