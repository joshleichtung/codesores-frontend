import React, { Component } from 'react';
import axios from 'axios'
import qs from 'qs';

import ReactBootstrap from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { ButtonGroup } from 'react-bootstrap';
import { DropdownButton } from 'react-bootstrap';
import { MenuItem } from 'react-bootstrap';

import Validity from './Validity.js'
import Difficulty from './Difficulty.js'
import RequestType from './RequestType.js'
import Submit from './Submit.js'

class UserFeedback extends Component { 
//missing user id from feedback params !!!
//showForm is not tied to specific user !!!
  constructor(){
    super()
    this.state = {
      feedback: {
        validity: '-',
        difficulty: '-',
        request_type: "-",
        issue_id: null
      },
      showForm: true
    }

    this.setFeedback = this.setFeedback.bind(this)
    this.submit      = this.submit.bind(this)
  }

  setId(){
    var feedback = {...this.state.feedback}
    feedback['issue_id'] = this.props.issueId;
    this.setState({feedback})
    this.state.feedback.issue_id = this.props.issueId
  }

  setFeedback(scope, value){
    var feedback = {...this.state.feedback}
    feedback[scope] = value;
    this.setState({feedback})
  }

  hideForm(){
    this.setState({showForm: false})
  }

  submit(){
    this.setId()
    this.hideForm()
    let query = qs.stringify(this.state)
    axios.post("http://localhost:3000/user_feedbacks",query).then((response)=>{
      console.log(response)
    })
  }

  render(){
    if (this.state.showForm){
      return (
        <div>
        <Validity     
        validity={this.state.feedback.validity}      
        setFeedback={this.setFeedback}
        /> 
        <Difficulty   
        difficulty={this.state.feedback.difficulty}  
        setFeedback={this.setFeedback}
        /> 
        <RequestType  
        type={this.state.feedback.request_type}               
        setFeedback={this.setFeedback} 
        />
        <Submit       
        submit={this.submit}
        />
        </div>
        )
    } else {
      return (<div> Thank you! </div>)  

    }
  }
}

export default UserFeedback;
