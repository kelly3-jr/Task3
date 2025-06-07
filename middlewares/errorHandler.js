// 25. Global error handler middleware

module.exports = function (err, req, res, next) {
  console.error('Global Error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
};
