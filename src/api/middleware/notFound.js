export const notFoundMiddleware = (req, res, next) => {
  res.status(404)

  if (req.accepts('html')) {
    res.render('404', { url: req.url })
    return
  }

  if (req.accepts('json')) {
    res.json({ error: 'Not found' })
    return
  }

  res.type('txt').send('Not found')
}
