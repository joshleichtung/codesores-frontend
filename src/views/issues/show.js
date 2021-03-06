import React from 'react'
import axios from 'axios'
import DonutChart from '../../components/data_viz/donut.js'

import Summary from '../../components/issue_components/summary.js'
import StarApp from '../../components/star_components/StarApp.js'

import {Grid, Row, Col} from 'react-bootstrap'

import UserFeedback from '../../components/user_feedback/UserFeedback.js'
import createHistory from 'history/createBrowserHistory'
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import { getCookie } from '../../utils';
axios.defaults.headers.common['Authorization'] = 'Bearer ' + getCookie('token');

class issueShow extends React.Component {

  constructor(args){
    super(args)
    this.state = {
      issue: {},
      issue_type: {},
      repo: {},
      language: {},
      feedbacks: {}
    };
    //Make API call
    const thisComponent = this
    let apiUrl = "http://localhost:3000/issues/" + this.props.router.match.params.id + "/?token=" + this.props.token

    axios.get(apiUrl).then(function (response) {
      thisComponent.parseJSONAndSetState(response);
      thisComponent.props.setNotice([])
    }
    ).catch((error)=>{
      thisComponent.props.setNotice(error.toString(), `Couldn't find the issue with id: ${this.props.router.match.params.id} `)
    })

    //Bind components to this
    this.parseJSONAndSetState = this.parseJSONAndSetState.bind(this)
  }

  // consume JSON from API call and update setState
  parseJSONAndSetState(json){
    this.setState({
      issue: json.data.issue,
      issue_type: json.data.request_type,
      repo: json.data.repo,
      language: json.data.language,
      feedbacks: json.data.feedbacks,
      stars: json.data.stars
    })
  }

  feedbackConditional(){
    const issueShow = this
    if (this.state.feedbacks.feedback_ids && issueShow.props.info){
      let display = true

      this.state.feedbacks.feedback_ids.forEach((id)=>{
        if (id === issueShow.props.info.id){
          display = false
        }
      })

      if (display){
        return (
          <UserFeedback issueId={this.props.router.match.params.id} setNotice={this.props.setNotice} token={this.props.token} />
        )
      }
    }
  }

  starConditional(){
    if(this.props.info){
      return (
        <StarApp issue={this.state.issue} stars={this.state.stars} token={this.props.token} info={this.props.info}/>
      )
    }
  }

  backButton(){
    const history = createHistory()
    return(
      <span>
        <button
          onClick={history.goBack}>
          Back
        </button>
      </span>
    )
  }



  render(){
    return(
      <div className="card-and-sidebar">
        <Grid>
          <Row className="show-grid">
            <Col xs={12} md={8}>
              <div id='issue_id'>
                <br />
                <Summary
                  issue={this.state.issue}
                  issue_type={this.state.issue_type}
                  repo={this.state.repo}
                  language={this.state.language}
                  feedbacks={this.state.feedbacks}
                />
              </div>
            </Col>
            <Col xs={6} md={4}>
              <div id='feedback' className="all-sidebar">
                {this.starConditional()}
                <br/><br/>
                {this.feedbackConditional()}
              </div>
            </Col>
          </Row>
          <Row>
          <Col xs={12} md={8}>
            <div id='issue_id'>
            <h3>Issue Stats</h3>
            <br />
            <div id='stats' className="stats-container">
            <div className="donut-container">
            <div className="centering">
            <h5>Estimated issue validity</h5><br /></div>
            <div className="centering">
            <DonutChart value={this.state.feedbacks.average_validity * 100} lowerLimit={0} upperLimit={100} delay={1000} diameter={150} />
            </div>
            </div>
            <div className="donut-container">
            <div className="centering">
            <h5>Estimated issue difficulty</h5><br /></div>
            <div className="centering">
            <DonutChart value={this.state.feedbacks.average_difficulty * 10} lowerLimit={0} upperLimit={100} delay={1500} diameter={150} />
            </div>
            </div>
            <div className="donut-container">
            <div className="centering">
            <h5>Issue popularity</h5><br /></div>
            <div className="centering">
            <DonutChart value={this.state.issue.comment_count} lowerLimit={0} upperLimit={20} delay={2000} diameter={150} />
            </div>
            </div>
            </div>
            </div>
          </Col>
          <Col xs={6} md={4}>
          </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}


export default issueShow
