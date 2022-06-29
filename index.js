const fs = require("fs/promises");
const express = require("express");
const cors = require("cors");

const _ = require("lodash");
const { v4: uuid } = require("uuid");
const res = require("express/lib/response");
const { response } = require("express");

const app = express();
app.use(express.json());

app.use('', require("./Router/router"));


app.listen(3000, () => console.log("API Server is running..."));