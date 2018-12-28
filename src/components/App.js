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
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './Header'
import PostDetail from './PostDetail'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <Router>
        <Fragment>
          <Header />
          <div className="container">
            <Route path="/" exact component={Home} />
            <Route path="/post/new" exact component={PostForm} />
            <Route path="/post/:id/detail" exact component={PostDetail} />
          </div>
        </Fragment>
      </Router>
    );
  }
}

export default connect()(App)
