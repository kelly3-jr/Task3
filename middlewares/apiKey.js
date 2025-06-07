//6.Middleware to check for custom header `x-api-key`

module.exports = function (req, res, next) {
  const apiKey = req.headers['x-api-key'];
  if (!apiKey) {
    return res.status(401).json({ error: 'API key missing' });
  }
  next();
};