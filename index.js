const express = require("express");
const app = express();
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");

app.use(
	cors({
		origin: "http://localhost:4200",
	})
);
app.use(morgan("common"));
app.use(helmet());

mongoose.connect("mongodb://localhost/my_database");

port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`app start listening at port ${port}...`);
});
