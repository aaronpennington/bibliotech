const express = require("express");
const path = require("path");
const session = require('express-session');
const app = express();
const passport = require("passport");
const util = require("util");
const GoodreadsStrategy = require("passport-goodreads").Strategy;

var GOODREADS_KEY = "CByUHqQdOsPZDGkNX44onQ";
var GOODREADS_SECRET = "dUen87eva33LchyCwByTi48N2Up14M6939FisnD6U";

const bookController = require("./controllers/bookController.js");

const port = process.env.PORT || 5000;

app.use(session({
  secret: 'ssshhhhh'
}));

var sess;

/* OAuth Stuff */
passport.use(
  new GoodreadsStrategy({
      consumerKey: GOODREADS_KEY,
      consumerSecret: GOODREADS_SECRET,
      callbackURL: "https://gentle-taiga-00007.herokuapp.com/auth/goodreads/callback"
    },
    function (token, tokenSecret, profile, done) {
      // asynchronous verification, for effect...
      process.nextTick(function () {
        // To keep the example simple, the user's Goodreads profile is returned to
        // represent the logged-in user.  In a typical application, you would want
        // to associate the Goodreads account with a user record in your database,
        // and return that user instead.
        return done(null, profile);
      });
    }
  )
);


passport.serializeUser(function (user, done) {
  //sess.user_id = user.id;
  done(null, user);
  console.log("USER ID: " + user.id);
  console.log("USER: " + user)
});

passport.deserializeUser(function (user, done) {
  //sess.user_id = null;
  done(null, user);
});


app.use(express.json()); // to support JSON-encoded bodies
app.use(
  express.urlencoded({
    extended: true
  })
); // to support URL-encoded bodies
app.use(
  require("express-session")({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true
  })
);
app.use(express.static(path.join(__dirname, "public")));
app.use(passport.initialize());
app.use(passport.session());

var sess;

/* ROUTES */
app.get("/", (req, res) => {
  sess = req.session;
  var user_id = sess.user_id;
  //ensureAuthenticated(req, res, {});
});
app.get("/login", (req, res) => res.redirect("/auth/goodreads"));
app.get("/logout", function (req, res) {
  sess = req.session;
  sess.user_id = 0;
  req.logout();
  res.redirect("/");
});

app.get("/list", bookController.getBookList);
app.get("/search", bookController.searchBook);
app.get("/review/list", bookController.getShelf);
app.get("/shelf/list", bookController.getShelfList);
app.post("/book", bookController.insertNewBook);
app.post("/shelf/add_to_shelf", bookController.addBook);

app.get("/auth/goodreads", passport.authenticate("goodreads"), function (
  req,
  res
) {
  // The request will be redirected to Goodreads for authentication, so this
  // function will not be called.
});

// GET /auth/goodreads/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get(
  "/auth/goodreads/callback",
  passport.authenticate("goodreads", {
    failureRedirect: "/login"
  }),
  function (req, res) {
    sess = req.session;
    sess.user_id = req.user.id;
    res.redirect("/");
  }
);

app.listen(port, () => {
  //console.log("Listening on http://localhost:" + port);
});

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}