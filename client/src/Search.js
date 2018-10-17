import React, { Component } from 'react'
import { callSearch } from './utils'

class Search extends Component {
  state = {
    orders: [],
    searchString: '',
    sortValue: 'ASC',
    filterValue: 1,
  }

  handleSelect = (e, type) => {
    this.setState({
      [type]: e.target.value,
    })
  }

  onChange = e => {
    this.setState({
      searchString: e.target.value
    })
    e.preventDefault()
  }

  search = async e => {
    e.preventDefault()

    const {
      searchString,
      sortValue,
      filterValue
    } = this.state

    const body = {
      searchString,
      sortValue,
      filterValue
    }
    const route = '/search_orders'

    this.setState({
      orders: await callSearch(route, body)
    })
  }

  renderSearchResult = () => {
    const { orders } = this.state

    let ordersToRender = orders.map((item, i) => {
      const {
        order_id,
        customer_id,
        amount
      } = item

      return (
        <div key={i} className="order-items">
          <p>order_id: {order_id}</p>
          <p>customer_id: {customer_id}</p>
          <p>amount: {amount}</p>
        </div>
      )
    })

    return ordersToRender
  }

  render() {
    const {
      searchString,
      orders,
      sortValue,
      filterValue,
    } = this.state

    return (
      <div className='center-content'>
        <br />
        <h4>Search Orders</h4>
        <form>
          <input
            type='text'
            required
            value={searchString}
            onChange={e => this.onChange(e)} />

          <select name="sort" size="1" value={sortValue} onChange={e => this.handleSelect(e, 'sortValue')}>
            <option value="ASC">Ascending amount</option>
            <option value="DESC">Descending amount</option>
          </select>

          <select name="filter" size="1" value={filterValue} onChange={e => this.handleSelect(e, 'filterValue')}>
            <option value="1">{'<99'}</option>
            <option value="2">{'100-499'}</option>
            <option value="3">{'500>'}</option>
          </select>

          <input
            type='submit'
            value='Search'
            onClick={e => this.search(e)} />
        </form>
        <br />
        {this.renderSearchResult()}
        <br />
      </div>
    )
  }
}

export default Search
