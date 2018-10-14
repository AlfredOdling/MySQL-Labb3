import React, { Component } from 'react'
import { callPost } from './utils'

class UploadFields extends Component {
  state = {
    ord_order_id: '',
    ord_customer_id: '',
    ord_amount: '',
    cust_customer_id: '',
    cust_customer_name: '',
  }

  uploadOrder = async e => {
    if (!e) { return }
    e.preventDefault()

    const { callGetOrders } = this.props
    const {
      ord_order_id,
      ord_customer_id,
      ord_amount
    } = this.state

    let route = '/upload_order'
    let body = {
      ord_order_id,
      ord_customer_id,
      ord_amount
    }

    const status = await callPost(route, body)
    if (status === 200) {
      this.setState({
        ord_order_id: '',
        ord_customer_id: '',
        ord_amount: '',
      })
      callGetOrders()
    } else {
      alert('Error, check console')
    }
  }

  uploadCustomer = async e => {
    if (!e) { return }
    e.preventDefault()

    const { callGetCustomers } = this.props
    const {
      cust_customer_id,
      cust_customer_name
    } = this.state

    let route = '/upload_customer'
    let body = {
      cust_customer_id,
      cust_customer_name
    }

    const status = await callPost(route, body)
    if (status === 200) {
      this.setState({
        cust_customer_id: '',
        cust_customer_name: '',
      })
      callGetCustomers()
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
    const {
      ord_order_id,
      ord_customer_id,
      ord_amount,
      cust_customer_id,
      cust_customer_name,
    } = this.state

    return (
      <div className="center-content"><br />
        <fieldset>
          <legend>Customer:</legend>
          <form>
            <input
              type="number"
              placeholder="Customer ID"
              required
              value={cust_customer_id}
              onChange={e => this.onChange('cust_customer_id', e)} />
            <input
              type="text"
              placeholder="Customer Name"
              required
              value={cust_customer_name}
              onChange={e => this.onChange('cust_customer_name', e)} />
            <input
              type="submit"
              value="Upload"
              onClick={e => this.uploadCustomer(e)} />
          </form>
        </fieldset><br />

        <fieldset>
          <legend>Order:</legend>
          <form>
            <input
              type="number"
              placeholder="Order ID"
              required
              value={ord_order_id}
              onChange={e => this.onChange('ord_order_id', e)} />
            <input
              type="number"
              placeholder="Customer ID"
              required
              value={ord_customer_id}
              onChange={e => this.onChange('ord_customer_id', e)} />
            <input
              type="number"
              placeholder="Amount"
              required
              value={ord_amount}
              onChange={e => this.onChange('ord_amount', e)} />
            <input
              type="submit"
              value="Upload"
              onClick={e => this.uploadOrder(e)} />
          </form>
        </fieldset>
      </div>
    )
  }
}

export default UploadFields
