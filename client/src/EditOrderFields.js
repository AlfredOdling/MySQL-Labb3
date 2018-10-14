import React from 'react'
import EditOrderFieldElement from './EditOrderFieldElement'

const EditOrderFields = ({ callGetOrders, orders }) => {

  const renderOrders = () => {
    let ordersToRender = orders.map((item, i) => {
      return (
        <EditOrderFieldElement
          key={i}
          item={item}
          callGetOrders={callGetOrders} />
      )
    })
    return ordersToRender
  }

  return (
    <div className="center-content">
      {renderOrders()}
    </div>
  )
}

export default EditOrderFields
