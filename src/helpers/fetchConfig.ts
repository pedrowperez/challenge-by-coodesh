export function fetchConfig() {
  const myHeaders = new Headers()
  const corsToken = import.meta.env.VITE_CORS

  myHeaders.append('Content-Type', 'application/json')
  myHeaders.append('x-cors-api-key', corsToken)

  return {
    method: 'POST',
    headers: myHeaders,
    mode: 'cors',
    cache: 'default',
  }
}
