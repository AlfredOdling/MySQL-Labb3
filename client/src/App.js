import React, { Component } from 'react'
import './App.css'
import { callGet } from './utils'
import EditOrderFields from './EditOrderFields'
import EditCustomerFields from './EditCustomerFields'
import UploadFields from './UploadFields'
import Search from './Search'

class App extends Component {
  state = {
    orders: [],
    customers: [],
    radio1: true,
    radio2: false,
  }

  async componentDidMount() {
    this.callGetCustomers()
    this.callGetOrders()
  }

  callGetOrders = async () => {
    this.setState({
      orders: await callGet('/orders')
    })
  }

  callGetCustomers = async () => {
    this.setState({
      customers: await callGet('/customers')
    })
  }

  onChange = (field, e) => {

    this.setState({
      radio1: !this.state.radio1,
      radio2: this.state.radio2
    })
    e.preventDefault()
  }

  render() {
    const { orders, customers } = this.state
    return (
      <div className="center-content"><br />
        <UploadFields
          callGetCustomers={this.callGetCustomers}
          callGetOrders={this.callGetOrders} />

        <Search />

        <EditCustomerFields
          callGetCustomers={this.callGetCustomers}
          customers={customers} /><br />

        <EditOrderFields
          callGetOrders={this.callGetOrders}
          orders={orders} />
      </div>
    )
  }
}

export default App
