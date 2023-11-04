export async function storefront(query, variables={}){
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': process.env.NEXT_PUBLIC_ACCESS_TOKEN,

    },
    body: JSON.stringify({
      query,
      variables
    })
  })
  
  if(!response.ok){
    throw new Error('Failed to fetch from storefront API')
  }

  return response.json()
}