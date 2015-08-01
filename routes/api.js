var request = require('request'),
    bodyParser = require('body-parser');

module.exports = function(app, express) {

  var apiRouter = express.Router();

  var config = {
    authToken : 'JXcU0iFjY3qbA4Kquoxv',
    authIDSecret : '136d12c5-d27b-4758-95db-18d077173fb2'
  };

  apiRouter.route('/verifysmarty')
    .post(function(req, res) {
      request({
        uri: 'https://api.smartystreets.com/street-address?auth-id='+config.authIDSecret+'&auth-token='+config.authToken+'&street='+req.body.street+'&city='+req.body.city+'&state='+req.body.state,
        method : 'POST'
        }, function (error, body, response) {
          res.send(response);     
    });
  });

  return apiRouter;
}