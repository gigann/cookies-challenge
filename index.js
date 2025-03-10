const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send(`
    <h1>Cookie Example</h1>
    <p>Go to <a href="/login">login</a> to set your name.</p>
    <p>Then visit <a href="/hello">hello</a> to see your welcome message.</p>
  `);
});

app.get('/login', (req, res) => {
    res.send(`
    <h1>Login</h1>
    <form method="POST" action="/login">
      <label for="name">Your Name:</label>
      <input type="text" id="name" name="name" required>
      <button type="submit">Submit</button>
    </form>
  `);
});

app.post('/login', (req, res) => {
    const name = req.body.name;

    res.cookie('name', name, { maxAge: 900000, httpOnly: true });

    res.send(`
    <p>Cookie set with your name: ${name}</p>
    <p>Go to <a href="/hello">hello</a> to see your welcome message.</p>
  `);
});

app.get('/hello', (req, res) => {
    const name = req.cookies.name;

    if (name) {
        res.send(`<h1>Welcome ${name}!</h1>`);
    } else {
        res.send(`
      <p>No name found. Please <a href="/login">login</a> first.</p>
    `);
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});