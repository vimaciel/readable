import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import UserNameModal from './UserNameModal'
import { connect } from 'react-redux'
import { handleSetAuthor } from '../actions/author'

class Header extends Component {
    state = {
        mobileMenuOpen: false,
        modalUserNameOpen: false,
    }

    onClickBurgerMenu = (e) => {
        e.preventDefault()

        this.setState(prevState => ({
            mobileMenuOpen: !prevState.mobileMenuOpen
        }))
    }

    onToggleModalUserName = (e) => {
        e.preventDefault()

        this.setState(prev => ({
            modalUserNameOpen: !prev.modalUserNameOpen
        }))
    }

    onLogOut = (e) => {
        e.preventDefault();
        this.props.setAuthor('')
    }

    render() {
        const { mobileMenuOpen } = this.state
        const { username, pathname } = this.props

        let userLayout
        if (username === undefined || username === '') {
            userLayout = (
                <div className="navbar-item">
                    <div className="buttons">
                        <a href="/" className="button is-dark" onClick={this.onToggleModalUserName}>
                            <strong>Who are you?</strong>
                        </a>
                    </div>
                </div>
            )
        } else {
            userLayout = (
                <div className="navbar-item has-dropdown is-hoverable">
                    <a href="/" className="navbar-link">
                        {`Welcome ${username}!`}
                    </a>
                    <div className="navbar-dropdown">
                        <a href="/" className="navbar-item" onClick={this.onToggleModalUserName}>
                            Change my name
                        </a>
                        <a href="/" className="navbar-item" onClick={this.onLogOut}>
                            Log out
                        </a>
                    </div>
                </div>
            )
        }

        return (
            <div>
                <nav className="navbar" role="navigation" aria-label="main navigation">
                    <div className="navbar-brand">
                        <a href="/" className="navbar-item">
                            <b className="brand">
                                Readable
                            </b>
                        </a>

                        <a href="/" onClick={this.onClickBurgerMenu} role="button" className={mobileMenuOpen ? 'navbar-burger is-active' : 'navbar-burger'} data-target="menu" aria-label="menu" aria-expanded="false">
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                        </a>

                    </div>

                    <div id="menu" className={mobileMenuOpen ? 'is-active' : 'navbar-menu'}>
                        <div className="navbar-start">
                            <a href="/" className={pathname === '/' ? 'navbar-item  is-active' : 'navbar-item'}>
                                Home
                            </a>

                            <a href="/post/new" className={pathname === '/post/new' ? 'navbar-item  is-active' : 'navbar-item'}>
                                New Post
                            </a>

                            <a href="/posts/report" className={pathname === '/posts/report' ? 'navbar-item  is-active' : 'navbar-item'}>
                                Posts Report
                            </a>
                        </div>

                        <div className="navbar-end">
                            {userLayout}
                        </div>
                    </div>
                </nav>
                <UserNameModal openModal={this.state.modalUserNameOpen} onCloseModal={this.onToggleModalUserName} />
            </div>
        )
    }
}

function mapStateToProps({ author }, { location }) {
    const username = author.username
    const pathname = location.pathname
    return {
        username,
        pathname
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setAuthor: (username) => {
            dispatch(handleSetAuthor(username))
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))