import React, { Component } from 'react'
import axios from 'axios'
import UserFeedback from '../user_feedback/UserFeedback.js'
import { Navbar, Jumbotron, Button, Grid, Row, Col  } from 'react-bootstrap';
import { Link } from 'react-router-dom'

class SearchResults extends Component {

  returnColumn(element){
    return(
      <Col sm={6} md={3}>
        <ul>
          <li> Title: {element.title} </li>
          <li> Labels: {element.label} </li>
          <li> Comment Count: {element.comment_count} </li>
          <li> <Link to={element.url}>Repository</Link> </li><br/>
          <li> <Link to={'/issues/' + element.id}>See Issue</Link> </li>
        </ul>
      </Col>
    )
  }

  mapResultsToFours() {
    let results = this.props.results
    let results_array = [];
    for(let i = 0; i < results.length; i ++) {
      if(i % 4 === 0){
        results_array.push([])
      }
      results_array[results_array.length - 1].push(results[i])
    }
    return results_array
  }
  renderRow(row) {
    return (
      <Row>
      {row.map(this.returnColumn)}
      </Row>
    )
  }


  mapResultsToFours() {
    let results = this.props.results
    let results_array = [];
    for(let i = 0; i < results.length; i ++) {
      if(i % 4 === 0){
        results_array.push([])
      }
      results_array[results_array.length - 1].push(results[i])
    }
    return results_array
  }

  renderRow(row) {
    return (
      <Row>
      {row.map(this.returnColumn)}
      </Row>
    )
  }

  render() {
    return (
      <div className="SearchResults">
      <Grid className="show-grid">
        { this.mapResultsToFours().map(this.renderRow.bind(this)) }
      </Grid>
      </div>
    );
  }
}

export default SearchResults;
