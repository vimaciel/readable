import React, { PureComponent } from 'react'
import NotFoundImage from '../images/404.png'

class NotFound extends PureComponent {
    componentDidMount() {
        this.props.handleAppClass()
    }

    render() {
        return (
            <div className="page-not-found">
                <section className="hero is-warning is-fullheight">
                    <div className="hero-body">
                        <div className="container">
                            <h1 className="title">
                                OPPS!! PAGE NOT FOUND
                            </h1>
                            <img className="page-not-found-image" alt="404" src={NotFoundImage}></img>
                            <h2 className="subtitle">
                                <a target="_blank" rel="noopener noreferrer" href='https://www.freepik.com/free-vector/winter-forest-animal-collection_3335188.htm'>Designed by Freepik</a>
                            </h2>
                        </div>
                    </div>
                </section>
            </div>
        )
    }

}

export default NotFound