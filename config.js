var ids = {
  facebook: {
    clientID: '484360891751213',
    clientSecret: 'd0a46d0091e539d5bc0cff6669a83c5c',
    callbackURL: 'http://public-interaction-portal.herokuapp.com/auth/facebook/callback'
  },
  twitter: {
    consumerKey: 'get_your_own',
    consumerSecret: 'get_your_own',
    callbackURL: "http://127.0.0.1:1337/auth/twitter/callback"
  },
  github: {
    clientID: 'get_your_own',
    clientSecret: 'get_your_own',
    callbackURL: "http://127.0.0.1:1337/auth/github/callback"
  },
  google: {
    clientID: 'get_your_own',
    clientSecret: 'get_your_own',
    callbackURL: 'http://127.0.0.1:1337/auth/google/callback'
  },
  instagram: {
    clientID: 'get_your_own',
    clientSecret: 'get_your_own',
    callbackURL: 'http://127.0.0.1:1337/auth/instagram/callback'
  }
};

module.exports = ids;