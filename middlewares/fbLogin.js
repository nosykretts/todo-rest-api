const FB = require('fb')
const boom = require('boom')
const facebook = new FB.Facebook({
  appId: process.env.FB_APP_ID,
  appSecret: process.env.FB_APP_SECRET,
})

module.exports = function(req, res, next) {
  facebook
    .api('me', {
      fields: ['id', 'name', 'email'],
      access_token: req.body.accessToken,
    })
    .then(response => {
      req.fbProfile = response
      next()
    })
    .catch(err => next(boom.boomify(err)))
}
