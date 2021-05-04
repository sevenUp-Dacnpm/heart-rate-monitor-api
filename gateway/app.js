const express = require("express");
const fetch = require("node-fetch");

// middleware
const auth = require("./middleware/auth");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * @route GET /verify_token
 * @header Authorization
 */
app.get("/verify_token", auth, (req, res) => {
  fetch(`http://user:8000/${req.user.id}`)
    .then(obj => obj.json())
    .then(json => res.json(json))
    .catch(err => res.json({ error: err.message }))
})

/**
 * @route POST /login
 * @request { username, password }
 */
app.post("/login", (req, res) => {
  fetch("http://user:8000/auth", {
    method: 'POST',
    body: JSON.stringify(req.body),
    headers: { 'Content-Type': 'application/json' }
  })
    .then(obj => obj.json())
    .then(json => res.json(json))
    .catch(err => res.json({ error: err.message }))
})

/**
 * @route POST /register
 * @request { username, password, profile: {fullName, gender, weight, height, dob} }
 */
app.post("/register", (req, res) => {
  fetch("http://user:8000/", {
    method: "POST",
    body: JSON.stringify(req.body),
    headers: { 'Content-Type': 'application/json' }
  })
    .then(obj => obj.json())
    .then(json => res.json(json))
    .catch(err => res.json({ error: err.message }))
})

/**
 * @route GET /users
 */
app.get("/users", auth, (req, res) => {
  fetch("http://user:8000/")
    .then(obj => obj.json())
    .then(json => res.json(json))
    .catch(err => res.json({ error: err.message }))
})

app.listen(8000, () => console.log("gateway is running"));
