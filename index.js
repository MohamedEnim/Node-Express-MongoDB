const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Course = require("./models/course");
const logger = require("./logger");

const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");

app.use(express.json());
app.use(
	cors({
		origin: "http://localhost:4200",
	})
);
app.use(morgan("common"));
app.use(helmet());

app.use("/v1/api/courses", logger);

mongoose
	.connect("mongodb://localhost/mongo-courses", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	})
	.then(() => console.log("connected to the database"));

async function getCourses2() {
	const courses = await Course.find({ isPublished: true })
		.sort({ price: -1 })
		.select({ name: 1, author: 1, price: 1 });
	console.log(courses);
}

//getCourses2();

async function getCourses3() {
	const courses = await Course.find().or([
		{ price: { $gte: 15 } },
		{ name: /.*by.*/ },
	]);
	console.log(courses);
}

//getCourses3();

port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`app start listening at port ${port}...`);
});
