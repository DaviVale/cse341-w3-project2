// This file configures GitHub OAuth authentication using Passport.


const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

// Configures GitHub OAuth authentication
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL
    },
    (accessToken, refreshToken, profile, done) => {
      // Sends the authenticated GitHub profile to the session
      return done(null, profile);
    }
  )
);

// Stores the authenticated user in the session
passport.serializeUser((user, done) => {
  done(null, user);
});

// Restores the authenticated user from the session
passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = passport;
