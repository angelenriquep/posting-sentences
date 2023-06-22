// Promote this to a separate package
export const checkAuthToken = (req, res, next) => {
  const { authorization } = req.headers

  if (authorization) {
    const token = authorization.split(' ')[1]

    if (token) {
      req.token = token
      next()
    } else {
      res.status(401).send({ error: 'Invalid authentication token' })
    }
  } else {
    res.status(401).send({ error: 'Authorization header not found' })
  }
}
