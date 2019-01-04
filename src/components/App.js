import React, { Component, Fragment } from 'react'
import Home from './Home'
import PostForm from './PostForm'
import 'bulma/css/bulma.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import '../App.css'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/share'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './Header'
import PostDetail from './PostDetail'
import NotFound from './NotFound'

class App extends Component {

  state = {
    style: {
      appClass: 'container',
      alreadyUpdated: false
    }
  }

  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  handleAppClass = (newClass) => {
    if(this.state.style.alreadyUpdated){
      return
    }

    this.setState({
      style: {
        appClass: newClass,
        alreadyUpdated: true
      }
    })
  }

  render() {
    return (
      <Router>
        <Fragment>
          <Header />
          <div className={this.state.style.appClass}>
            <Switch>
              <Route path="/" exact component={Home} />              
              <Route path="/post/new" exact component={PostForm} />
              <Route path="/post/:id/edit" exact component={PostForm} />
              <Route path="/:category/:post_id" exact component={PostDetail} />
              <Route component={_ => <NotFound handleAppClass={this.handleAppClass} />} />
            </Switch>
          </div>
        </Fragment>
      </Router>
    );
  }
}

export default connect()(App)
