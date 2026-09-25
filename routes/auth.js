//This file contains the authentication routes used by GitHub OAuth.


const express = require('express');
const passport = require('../config/passport');

const router = express.Router();

// Starts the GitHub OAuth login process
router.get(
  '/github',
  passport.authenticate('github', {
    scope: ['user:email']
  })
);

// Receives the user after GitHub authentication
router.get(
  '/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/auth/status'
  }),
  (req, res) => {
    // Redirects the authenticated user to the authentication status route
    res.redirect('/auth/status');
  }
);

// Shows the current authentication status
router.get('/status', (req, res) => {
  try {
    if (req.isAuthenticated()) {
      return res.status(200).json({
        authenticated: true,
        user: {
          id: req.user.id,
          username: req.user.username,
          displayName: req.user.displayName
        }
      });
    }

    return res.status(200).json({
      authenticated: false
    });
  } catch (error) {
    return res.status(500).json({
      error: 'Failed to check authentication status'
    });
  }
});

// Ends the current user session
router.get('/logout', (req, res, next) => {
  req.logout((error) => {
    if (error) {
      return next(error);
    }

    // Destroys the session after the user logs out
    req.session.destroy(() => {
      res.status(200).json({
        message: 'Logged out successfully'
      });
    });
  });
});

module.exports = router;