const { Router } = require("express");
const router = Router();
const Course = require("./models/course");

router.get("/", async (req, res) => {
	const courses = await Course.find()
		.sort({ name: 1 })
		.select({ name: 1, author: 1 });
	res.status(200).send(courses);
	console.log(courses);
});

router.post("/c1", async (req, res) => {
	const course = req.body;
	const c1 = new Course({
		tags: course.tags,
		name: course.name,
		author: course.author,
		isPublished: course.isPublished,
	});
	const saveCourse = await c1.save();
	res.status(201).send(saveCourse);
});

module.exports = router;
