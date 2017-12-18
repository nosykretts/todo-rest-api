module.exports = {
  selfAuth : function(req, res, next) {
    if (req.decoded.userId == req.params.id) {
      next()
    } else {
      next(boom.unauthorized('Unauthorized action'))
    }
  }
}