import React from 'react'
import axios from 'axios'
import Button from 'react-toolbox/lib/button/Button'
import IconButton from 'react-toolbox/lib/button/Button'
import FontIcon from 'react-toolbox/lib/font_icon';
import qs from 'qs'
import StarButton from './StarButton.js'


class StarApp extends React.Component {

  constructor(){
    super()
    this.state = {
      liked: null
    }
    
    this.setStar = this.setStar.bind(this)
    this.render = this.render.bind(this)
    // this.persistStarState = this.persistStarState.bind(this)
    // this.starConditional = this.starConditional.bind(this)
  }

  setStar(){
    if (this.state.liked === false){
      console.log("liked")
      this.setState({liked: true},this.createStar())
    } else {
      console.log("unliked")
      this.setState({liked: false},this.deleteStar())
    }
  }

  createStar(){
    let starApp = this

    let params = qs.stringify({
      token: this.props.token,
      issue_id: this.props.issue.id,
      liked: this.state.liked
    })

    axios.post("http://localhost:3000/stars/create",params).then((response)=>{

    }).catch((error)=>{
      // starApp.props.setNotice(error.toString(), "Couldn't star issue")
    })
  }

  deleteStar(){
    let starApp = this

    let params = qs.stringify({
      token: this.props.token,
      issue_id: this.props.issue.id,
      liked: this.state.liked
    })

    axios.post("http://localhost:3000/stars/delete",params).then((response)=>{

    }).catch((error)=>{
      // starApp.props.setNotice(error.toString(), "Couldn't star issue")
    })

  }

  shouldComponentUpdate(nextProp){
    console.log(this.props)
    let hasVoted = false
    if (this.props.issue.stars && nextProp.info){
      this.props.issue.stars.forEach((star)=>{
        console.log('star id', star.user_id)
        console.log('user id', nextProp.info.id)

        if (star.user_id === nextProp.info.id){
          hasVoted = true
        }
      })
      if (hasVoted){
        console.log('liked true')
        // debugger
        this.setState({liked: true}, console.log('worked?',this.state.liked))
        this.state.liked = true
        console.log('state???',this.state.liked)

      }else{
        console.log('set to false')
        this.setState({liked: false})
        this.state.liked = false
        console.log('state???',this.state.liked)
      }
    }
    return true
  }


  render(){
    return(
      <div>
      <StarButton starState={this.state.liked} setStar={this.setStar}/>
      </div>
      )
  }
}


export default StarApp