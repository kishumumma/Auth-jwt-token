const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

app.get("/api", (req, res) => {
  res.json({
    message: "welcome to the api",
  });
});

app.post("/api/posts", verifytoken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: "post created",
        authData,
      });
    }
  });
});

app.post("/api/login", (req, res) => {
  //mock user

  const user = {
    username: "sonika",
    email: "niralasonika@gmail.com",
  };
  jwt.sign({ user }, "secretkey", { expiresIn: "30s" }, (err, token) => {
    res.json({
      token,
    });
  });
});

const port = 5000;
//format of token
//Authorization:bearer <acces_tokrn>
//verifytoken
function verifytoken(req, res, next) {
  //Get the auth header value
  const bearerHeader = req.headers["authorization"];
  //check if beare is undefiner
  if (typeof bearerHeader !== "undefined") {
    //split at the space
    const bearer = bearerHeader.split(" ");
    //get the token from array
    const bearerToken = bearer[1];
    //set the token
    req.token = bearerToken;
    next();
  } else {
    //forbidden
    res.sendStatus(403);
  }
}

app.listen(port, () => console.log(`server is listening at port ${port}`));
