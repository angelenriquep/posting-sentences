export const notFound = (req, res, next) => {
  res.status(404)

  if (req.accepts('json')) {
    res.json({ error: 'Not found' })
    return
  }

  res.type('txt').send('Not found')
}
