import React, { Component } from 'react'
import { callPost } from './utils'

class EditCustomerFieldElement extends Component {

  state = {
    customer_id: '',
    customer_name: '',
    initLoad: false
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { item } = nextProps
    const { customer_id, customer_name } = item
    let returnStatement = []

    if (item !== prevState.item && !prevState.initLoad) {
      returnStatement = {
        initLoad: true,
        customer_id,
        customer_name,
      }
    }
    return returnStatement
  }

  renderCustomer = () => {
    const { customer_id, customer_name } = this.state

    return (
      <form>
        <input
          type="number"
          required
          value={customer_id}
          onChange={() => { }} />
        <input
          type="text"
          required
          value={customer_name}
          onChange={e => this.onChange('customer_name', e)} />
        <input
          type="submit"
          value="Delete"
          onClick={e => this.deleteCustomer(e)} />
        <input
          type="submit"
          value="Update"
          onClick={e => this.updateCustomer(e)} />
      </form>
    )
  }

  deleteCustomer = async e => {
    e.preventDefault()
    const { callGetCustomers } = this.props
    const { customer_id } = this.state

    let route = '/delete_customer'
    let body = { customer_id }

    const status = await callPost(route, body)
    if (status === 200) {
      callGetCustomers()
    } else {
      alert('Error, check console')
    }
  }

  updateCustomer = async e => {
    e.preventDefault()
    const { callGetCustomers } = this.props
    const { customer_id, customer_name } = this.state

    let route = '/update_customer'
    let body = { customer_id, customer_name }

    const status = await callPost(route, body)
    if (status === 200) {
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
    return (
      <div className="center-content">
        {this.renderCustomer()}
      </div>
    )
  }
}

export default EditCustomerFieldElement
