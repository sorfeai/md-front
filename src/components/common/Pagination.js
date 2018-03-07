import React, { Component } from 'react'
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import styles from './../../styles/components/common/Pagination.css'

import Link from './Link'
import NavLink from './NavLink'

class Pagination extends Component {
  static propTypes = {
    itemsComponent: PropTypes.func,
    itemsOnPage: PropTypes.number,
    api: PropTypes.string
  }

  static defaultTypes = {
    itemsOnPage: 7
  }

  state = {
    totalItems: null,
    currentPage: null
  }

  componentDidMount() {
    this.loadTotalItems()
    this.updateCurrentPage()
  }

  loadTotalItems() {
    fetch(`${process.env.REACT_APP_API_ROOT}/${this.props.api}-quantity`)
      .then(data => data.json())
      .then(json => this.setState({ totalItems: json.quantity }))
  }

  updateCurrentPage = (num) => {
    this.setState(prev => ({
      ...prev,
      currentPage: num
    }))
  }

  renderPage(num) {
    return (
      <div className={styles['page']}>
        <div className={styles['items']}>
          {this.renderItems(num)}
        </div>
      </div>
    )
  }

  renderItems(pageNum) {
    const { itemsComponent, api, itemsOnPage } = this.props
    return React.createElement(itemsComponent, {
      api: `/${api}?_sort=datePublished:desc&_from=${itemsOnPage * pageNum}&_limit=${itemsOnPage}`
    })
  }

  renderPagination() {
    const { match, location, api, itemsOnPage } = this.props
    const { currentPage } = this.state

    const totalPages = Math.round(this.state.totalItems / this.props.itemsOnPage)

    return (
      <div className={styles['pagination']}>
        <ul>
          {(currentPage > 0) &&
            <li onClick={}>
              <NavLink to={`${match.url}/${api}/pages/${currentPage - 1}`}>
                ←
              </NavLink>
            </li>}
          {[...Array(totalPages)].map((e, pageNum) =>
            <li onClick={}>
              <NavLink to={`${match.url}/${api}/pages/${pageNum}`}>
                {pageNum}
              </NavLink>
            </li>)}
          {(currentPage < totalPages - 1) &&
            <li onClick={}>
              <NavLink to={`${match.url}/${api}/pages/${currentPage + 1}`}>
                →
              </NavLink>
            </li>}
        </ul>
      </div>
    )
  }

  render() {
    if (!this.state.totalItems) return null

    const { match, api } = this.props

    return (
      <Router>
        <div>
          <Route
            exact
            path={`${match.path}/${api}/pages/:pageNum`}
            render={({ match }) => this.renderPage(match.params.pageNum)}
          />
          {this.renderPagination()}
        </div>
      </Router>
    )
  }
}

export default withRouter(Pagination)
