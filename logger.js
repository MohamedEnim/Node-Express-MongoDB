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

router.post("/", async (req, res) => {
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

router.get("/:id", async (req, res) => {
	const id = req.params.id;
	const course = await Course.findById(id);
	//
	res.status(200).send(course);
});

router.put("/:id", async (req, res) => {
	const id = req.params.id;
	const data = req.body;
	/*result = await Course.update(
		{ _id: id },
		{
			$set: {
				name: data.name,
				isPublished: data.isPublished,
			},
		}
	);
	res.send(result);*/
	const course = await Course.findByIdAndUpdate(
		id,
		{
			$set: {
				name: data.name,
				isPublished: data.isPublished,
			},
		},
		{
			new: true,
		}
	);
	res.send(course);
});

router.delete("/:id", async (req, res) => {
	const id = req.params.id;

	const result = await Course.deleteOne({ _id: id });
	res.send(result);
});

module.exports = router;
