/*
   EXAMPLE USE:

  callGetOrders = async () => {
    this.setState({
      orders: await callGet('orders'),
    })
  }
*/

export async function callGet(route) {
   const response = await fetch(route)
   const { statusText, status } = response

   if (status !== 200) {
      console.error(statusText)
      return []
   } else {
      return await response.json()
   }
}

/*
   EXAMPLE USE:

    const route = '/upload_customer'
    const body = {
      cust_customer_id,
      cust_customer_name
    }

    const status = await callPost(route, body)
    if (status === 200) {
      this.setState({
        cust_customer_id: '',
        cust_customer_name: '',
      })
      this.callGetCustomers()
    } else {
      alert('Error, check console')
    }
*/

export async function callPost(route, body) {
   const response = await fetch(route, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
         'Accept': 'application/json'
      },
      body: JSON.stringify(body)
   })
   const { statusText, status } = response

   if (status !== 200) { console.error(statusText) }

   return status
}

export async function callSearch(route, body) {
  const response = await fetch(route, {
     method: 'POST',
     headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
     },
     body: JSON.stringify(body)
  })
  const { statusText, status,  } = response

  if (status !== 200) { 
    console.error(statusText) 
  } else {
    return await response.json()
  }

  return status
}
