import React from 'react'
import EditCustomerFieldElement from './EditCustomerFieldElement'

const EditCustomerFields = ({ callGetCustomers, customers }) => {

  const renderCustomers = () => {
    let customersToRender = customers.map((item, i) => {
      return (
        <EditCustomerFieldElement
          key={i}
          item={item}
          callGetCustomers={callGetCustomers} />
      )
    })
    return customersToRender
  }

  return (
    <div className="center-content">
      {renderCustomers()}
    </div>
  )
}

export default EditCustomerFields
