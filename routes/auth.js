/*
  This file contains the authentication routes used by GitHub OAuth.

  /auth/github starts the GitHub login process.
  /auth/github/callback receives the user after GitHub authentication.
  /auth/status shows whether a user is currently authenticated.
  /auth/logout ends the user's session.
*/

const express = require('express');
const passport = require('../config/passport');

const router = express.Router();

// GET /auth/github - Starts the GitHub OAuth login process
router.get(
  '/github',
  /*
    #swagger.tags = ['Authentication']
    #swagger.description = 'Starts the GitHub OAuth login process.'

    #swagger.responses[302] = {
      description: 'Redirects the user to GitHub for authentication.'
    }

    #swagger.responses[500] = {
      description: 'Authentication process failed.'
    }
  */
  passport.authenticate('github', {
    scope: ['user:email']
  })
);

// GET /auth/github/callback - Receives the user after GitHub authentication
router.get(
  '/github/callback',
  /*
    #swagger.tags = ['Authentication']
    #swagger.description = 'Receives the user after GitHub authentication and creates the authenticated session.'

    #swagger.responses[302] = {
      description: 'Redirects the authenticated user to the authentication status route.'
    }

    #swagger.responses[401] = {
      description: 'GitHub authentication failed.'
    }

    #swagger.responses[500] = {
      description: 'Authentication callback failed.'
    }
  */
  passport.authenticate('github', {
    failureRedirect: '/auth/status'
  }),
  (req, res) => {
    // Redirects the authenticated user to the authentication status route
    res.redirect('/auth/status');
  }
);

// GET /auth/status - Shows the current authentication status
router.get(
  '/status',
  /*
    #swagger.tags = ['Authentication']
    #swagger.description = 'Shows whether the current user is authenticated.'

    #swagger.responses[200] = {
      description: 'Authentication status retrieved successfully.'
    }

    #swagger.responses[500] = {
      description: 'Failed to check authentication status.'
    }
  */
  (req, res) => {
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
  }
);

// GET /auth/logout - Ends the current user session
router.get(
  '/logout',
  /*
    #swagger.tags = ['Authentication']
    #swagger.description = 'Logs out the current user and destroys the authenticated session.'

    #swagger.responses[200] = {
      description: 'User logged out successfully.'
    }

    #swagger.responses[500] = {
      description: 'Failed to log out the user.'
    }
  */
  (req, res) => {
    try {
      req.logout((error) => {
        if (error) {
          return res.status(500).json({
            error: 'Failed to log out'
          });
        }

        // Destroys the session after the user logs out
        req.session.destroy((sessionError) => {
          if (sessionError) {
            return res.status(500).json({
              error: 'Failed to destroy the session'
            });
          }

          return res.status(200).json({
            message: 'Logged out successfully'
          });
        });
      });
    } catch (error) {
      return res.status(500).json({
        error: 'Failed to log out'
      });
    }
  }
);

module.exports = router;