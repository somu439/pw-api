export const config = {
  baseUrl: process.env.BASE_URL ?? 'https://jsonplaceholder.typicode.com',

  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },

  report: {
    projectName: 'pw-rest',
    release: '1.0.0',
    apiUnderTest: 'JSONPlaceholder (jsonplaceholder.typicode.com)'
  }
}
