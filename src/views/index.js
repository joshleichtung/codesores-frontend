import React from 'react'
import SearchApp from '../components/search_components/SearchApp.js'
import SearchResults from '../components/search_components/SearchResults.js'
import Header from '../components/Header.js'
import LoginButton from '../components/LoginButton'
import SortBy from '../components/search_components/SortBy.js'


class Index extends React.Component {
  constructor(args){
    super(args)
    this.state = {
      resultsPurgatory: [],
      resultsToDisplay: [],
      sortBy: {},
      sortByDescending: true
    }
    this.updateResults = this.updateResults.bind(this)
    this.sortResultsBy = this.sortResultsBy.bind(this)
    this.updateSortBy = this.updateSortBy.bind(this)
    this.updateSortByDescending = this.updateSortByDescending.bind(this)
  }

  updateSortBy(toggleValue){
    this.setState({sortBy: {[toggleValue]: true}})
    this.sortResultsBy(toggleValue)
  }

  updateSortByDescending(){
    this.setState({sortByDescending: !this.state.sortByDescending})
    this.sortResultsBy()
  }

  updateResults(response){
    this.setState({resultsPurgatory: response})
    this.sortResultsBy()
  }


  sortResultsBy(toggleValue){
    console.log(this.state.sortByDescending)
    let sortedArray = []
    let sortBy = toggleValue
    if(sortBy && !this.state.sortByDescending) {
      sortedArray = this.state.resultsPurgatory.sort(function(a, b){
        return a[sortBy] - b[sortBy]
      })
    }
    else if(sortBy && this.state.sortByDescending) {
      sortedArray = this.state.resultsPurgatory.sort(function(a, b){
        return b[sortBy] - a[sortBy]
      })
    }

    else{sortedArray = this.state.resultsPurgatory }

    let new_resultsToDisplay = sortedArray;
    this.setState({resultsToDisplay: new_resultsToDisplay})

  }

  render(){

    return(
      <div className="search-full-container">
      <div className='search-sidebar'>
      <SearchApp updateResults={this.updateResults} setNotice={this.props.setNotice} token={this.props.token} />
      <div id='sort-by'><h3>Sort your results:</h3><SortBy updateSortByDescending={this.updateSortByDescending} updateSortBy={this.updateSortBy} sortByDescending={this.state.sortByDescending}/></div>
      </div>
      <div className="search-results">
      <main id='search-results'>

      <SearchResults resultsToDisplay={this.state.resultsToDisplay} token={this.props.token} sortByDescending={this.state.sortByDescending} updateSortBy={this.updateSortBy}/>
      </main>
      </div>
      </div>
    )
  }

}


export default Index
