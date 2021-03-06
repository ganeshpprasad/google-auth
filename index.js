const express = require("express");
const jwt = require("jsonwebtoken");

const dev = process.env.NODE_ENV !== "production";

const app = express();
const PORT = process.env.PORT || 5000;

const verifyToken = (req, res, next) => {
	const bearerHeader = req.headers["authorisation"];

	if (!bearerHeader) {
		res.sendStatus(403);
	} else {
		const token = bearerHeader.split(" ")[1];
		req.token = token;
		next();
	}
};

app.get("/", (req, res) => {
	res.json({
		message: "welcom"
	});
});

app.listen(PORT, () => console.log("server started on 5000"));

app.post("api/login", (req, res) => {
	const user = {
		name: req.data.name,
		password: req.data.password
	};
	jwt.sign({ user }, "secret", (err, token) => {
		res.json({
			token
		});
	});

	res.json({
		message: login
	});
});

app.post("api/list", verifyToken, (req, res) => {
	jwt.verify(req.token, "secret", (err, authData) => {
		if (err) {
			res.sendStatus(403);
		} else {
			res.json({
				message: "lists",
				authData
			});
		}
	});
});
