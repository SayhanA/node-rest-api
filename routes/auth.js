const { body } = require("express-validator");
const { signup, login } = require("../controllers/auth");
const routes = require("express").Router();
const User = require("../models/user");

routes.put(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("E-Mail address already exist!");
          }
        });
      })
      .normalizeEmail(),
    body("password").trim().isLength({ min: 5 }),
    body("name").trim().not().isEmpty(),
  ],
  signup
);

routes.post("/login", login);

module.exports = routes;
