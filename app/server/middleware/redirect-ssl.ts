import redirectSSL from 'redirect-ssl'

export default defineEventHandler((event) => {
  if (process.env.NODE_ENV === 'production') {
    redirectSSL(event.req, event.res)
  }
})
