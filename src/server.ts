import express from "express";
import db from "./config/db.config.js";
import { createNewRound } from "./repositories/round.repository.js";
import roundRoutes from "./routes/round.routes.js";

const app = express();

app.get("/", async (req, res) => {
	try {
		const result = await db.query("SELECT * FROM round;");
		res.json(result.rows);
	} catch (err) {
		console.log(err);
	}
});

app.use(express.json());
app.use("/api", roundRoutes);

app.listen(process.env.PORT, () => {
	console.log("Server is running on port 3000");
});
