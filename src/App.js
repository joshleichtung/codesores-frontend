import React, {Component} from 'react'
import './App.css'
import Header from './components/Header'
import Main from './components/Main'
import Notice from './components/error_handling/Notice'
import axios from 'axios'
import { getQueryParams } from './utils';

class App extends Component {
  constructor() {
    super();

    const params = getQueryParams();
    this.state = {
      token: params.token,
      notice: ['Error #1', 'Error #2']

    };
    this.deleteToken = this.deleteToken.bind(this)
    this.deleteErrorsAfterView = this.deleteErrorsAfterView.bind(this)
  }

  deleteToken() {
    this.setState({ token: null })
  }

  deleteErrorsAfterView(){
    this.setState({notice: []})

  }

  render() {
    return (
      <div>
        <Notice notice={ this.state.notice } deleteErrorsAfterView={ this.deleteErrorsAfterView }/>
        <Header
          loggedIn={ this.state.token ? true : false }
          logout={ this.deleteToken }
        />
        <Main />
      </div>
    )
  }
}

export default App
