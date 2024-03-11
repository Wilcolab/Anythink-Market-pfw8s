//TODO: seeds script should come here, so we'll be able to put some data in our local env

const mongoose = require("mongoose");

require("../models/User");
require("../models/Item");
require("../models/Comment");

const UserModel = mongoose.model("User");
const ItemModel = mongoose.model("Item");
const CommentModel = mongoose.model("Comment");

mongoose.connect(process.env.MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const seedDatabase = async () => {
	// Clear the database
	// await UserModel.deleteMany({});
	// await ItemModel.deleteMany({});
	// await CommentModel.deleteMany({});

	// Manually create 100 users
	const users = [];
	for (let i = 0; i < 100; i++) {
		const user = new UserModel({
			username: `user${i}`,
			email: `user${i}@example.com`,
			bio: `This is user number ${i}`,
			image: `https://example.com/avatar${i}.jpg`,
			role: i % 2 === 0 ? "user" : "admin",
			hash: `hash${i}`, // For simplicity, just using a placeholder
			salt: `salt${i}`, // For simplicity, just using a placeholder
		});
		await user.save();
		users.push(user);
	}

	// Manually create 100 items
	const items = [];
	for (let i = 0; i < 100; i++) {
		const item = new ItemModel({
			slug: `item-${i}`,
			title: `Item ${i}`,
			description: `This is item number ${i}`,
			image: `https://example.com/item${i}.jpg`,
			seller: users[Math.floor(Math.random() * users.length)]._id,
		});
		await item.save();
		items.push(item);
	}

	// Manually create 100 comments
	for (let i = 0; i < 100; i++) {
		const comment = new CommentModel({
			body: `This is comment number ${i}`,
			seller: users[Math.floor(Math.random() * users.length)]._id,
			item: items[Math.floor(Math.random() * items.length)]._id,
		});
		await comment.save();
	}

	console.log("Database seeded successfully!");
	process.exit();
};

seedDatabase().catch((err) => {
	console.error(err);
	process.exit(1);
});
