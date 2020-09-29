const mongoose = require("mongoose");
const { Schema } = mongoose;

const courseSchema = new Schema({
	tags: [String],
	date: { type: Date, default: Date.now },
	name: String,
	author: String,
	isPublished: Boolean,
	price: Number,
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
