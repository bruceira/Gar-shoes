const bodyParser = require("body-parser")
const express = require("express")
const fs = require("fs")
const logger = require("morgan")
const path = require("path")
const itemRoutes = require("./routes/itemRoutes.js")

const app = express()
const PORT = process.env.PORT || 3000

app.set('port', PORT)

//middleware
app.use(logger("tiny"))
app.use(bodyParser.json())
app.use("/", require(path.join(__dirname, "./routes/itemRoutes")))

app.use((req, res, next) => {
  const err = new Error(`${req.method} ${req.url} Not Found`);
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
    },
  });
});


app.listen(PORT)