// Middleware to check for Base64 encoded cookie
export const checkBase64Cookie = (req, res, next) => {
  const { cookie } = req.headers;

  console.log(req.headers)

  if (cookie) {
    try {
      const decodedCookie = Buffer.from(cookie, 'base64').toString('utf-8');
      req.decodedCookie = decodedCookie;
      next();
    } catch (error) {
      res.status(400).json({ error: 'Invalid Base64 encoded cookie' });
    }
  } else {
    res.status(400).json({ error: 'Cookie not found' });
  }
};