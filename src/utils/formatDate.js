export function formatDate(date){
  return Intl.DateTimeFormat('en-US', {
    dateStyle: 'short',
    timeStyle: 'short'
  }).format(new Date(date))
}