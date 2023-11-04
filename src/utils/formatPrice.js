export function formatPrice(price){
  return Intl.NumberFormat('en-US', {
    currency: 'USD',
    minimumFractionDigits: 2,
    style: 'currency'
  }).format(price)
}