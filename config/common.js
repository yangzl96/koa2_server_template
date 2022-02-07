module.exports = {
  security: {
    secretKey: 'abcdefg',
    expiresIn: 60 * 60 * 24
  },
  env: process.env.NODE_ENV
}