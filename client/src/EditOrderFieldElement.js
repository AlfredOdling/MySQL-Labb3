import React, { Component } from 'react'
import { callPost } from './utils'

class EditCustomerFieldElement extends Component {
  state = {
    order_id: '',
    customer_id: '',
    amount: '',
    initLoad: false
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { item } = nextProps
    const { 
      order_id, 
      customer_id, 
      amount 
    } = item
    let returnStatement = []

    if (item !== prevState.item && !prevState.initLoad) {
      returnStatement = { 
        initLoad: true,
        order_id, 
        customer_id, 
        amount
      }
    }
    return returnStatement
  }

  renderOrder = () => {
    const { 
      order_id, 
      customer_id, 
      amount
    } = this.state

      return (
        <form>
          <input
            type="number"
            required
            value={order_id}
            onChange={() => {}} />
          <input
            type="text"
            required
            value={customer_id}
            onChange={() => {}} />
          <input
            type="text"
            required
            value={amount}
            onChange={e => this.onChange('amount', e)} />
          <input
            type="submit"
            value="Delete"
            onClick={e => this.deleteOrder(e)} />
          <input
            type="submit"
            value="Update"
            onClick={e => this.updateOrder(e)} />
        </form>
      )
  }

  deleteOrder = async e => {
    e.preventDefault()
    const { callGetOrders } = this.props
    const { order_id } = this.state

    let route = '/delete_order'
    let body = { order_id }

    const status = await callPost(route, body)
    if (status === 200) {
      callGetOrders()
    } else {
      alert('Error, check console')
    }
  }

  updateOrder = async e => {
    e.preventDefault()
    const { callGetOrders } = this.props
    const {
      order_id,
      customer_id,
      amount
    } = this.state

    let route = '/update_order'
    let body = {
      order_id,
      customer_id,
      amount
    }

    const status = await callPost(route, body)
    if (status === 200) {
      callGetOrders()
    } else {
      alert('Error, check console')
    }
  }

  onChange = (field, e) => {
    this.setState({
      [field]: e.target.value
    })
    e.preventDefault()
  }

  render() {
    return (
      <div className="center-content">
        {this.renderOrder()}
      </div>
    )
  }
}

export default EditCustomerFieldElement
