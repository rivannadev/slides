const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public"))); //static files management

app.listen(8000, () => {
    console.log("Listening"); //In order to cancel long listening
});