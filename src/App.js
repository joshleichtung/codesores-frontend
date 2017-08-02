import React, {Component} from 'react'
import './App.css'
import Header from './components/Header'
import Main from './components/Main'
import Notice from './components/error_handling/Notice'
import axios from 'axios'
import { getQueryParams } from './utils';

class App extends Component {
  constructor() {
    super()

    const params = getQueryParams()

    this.state = {
      token: params.token,
      notice: [],
      info: ""
    }


    this.fetchUserDetails();

    this.deleteToken = this.deleteToken.bind(this)
    this.deleteErrorsAfterView = this.deleteErrorsAfterView.bind(this)
    this.setNotice = this.setNotice.bind(this)
    this.fetchUserDetails = this.fetchUserDetails.bind(this)
  }

  deleteToken() {
    this.setState({ token: null });
    window.location.href = window.location.href.replace(/\?.*$/, '');
  }

  deleteErrorsAfterView(){
    this.setState({notice: []})
  }

  fetchUserDetails() {
    console.log('fetching!!!')
    if (this.state.token){
      let app = this;
      let userApiUrl = "http://localhost:3000/users?token=" + this.state.token

      axios.get(userApiUrl).then((response)=>{
        // console.log(response.data)
        app.setState({info: response.data}, ()=>{
        })
      }).catch((error)=>{
        app.setNotice(error.toString(), "User must be logged in")
      })
    }
    
  }

  setNotice(...errors){
    this.setState({notice: errors})
  }

  render() {
    const info = this.state.info;
    return (
      <div>
        <Header token={this.state.token} logout={this.deleteToken}  userInfo={this.fetchUserDetails} info={info} />
        <Main setNotice={this.setNotice} token={this.state.token} info={info} fetchUser={this.fetchUserDetails}/>
        <Notice notice={ this.state.notice } deleteErrorsAfterView={ this.deleteErrorsAfterView }/>
      </div>
    )
  }
}

export default App
