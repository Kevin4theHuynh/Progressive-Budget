const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");
const cors = require('cors')

const PORT = 3001;

const app = express();
app.use(cors())

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect("mongodb://localhost/budget", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}).then(r => console.log("Connected"));

// routes
app.use(require("./routes/api.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
