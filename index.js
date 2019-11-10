const path = require("path")
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose")

const passportJWT = require('./middlewares/passportJWT')(); //we import it as a function
const errorHandler = require('./middlewares/errorHandler')
const postRoutes = require("./routes/post");
const authRoutes = require("./routes/auth");
const app = express();

app.use(cors());

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/rest-api-node', { useNewUrlParser: true});

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public"))); //static files management
app.use(passportJWT.initialize());

app.use("/api/auth", authRoutes);
app.use("/api/post", passportJWT.authenticate(), postRoutes); //the route that we are using to simulate with the server check listen below

app.use(errorHandler); //in order to define the error

app.listen(8000, () => {
    console.log("Listening"); //In order to simulate at http://localhost:8000/api/post server listening
});