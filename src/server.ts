import express from "express";
import pkg from "express-openid-connect";
const { auth, requiresAuth } = pkg;
import roundRoutes from "./routes/round.routes.js";
import indexRoutes from "./routes/index.routes.js";
import ticketRoutes from "./routes/ticket.routes.js";
import path from "path";
import { fileURLToPath } from "url";
import { getCurrentRound } from "./repositories/round.repository.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
console.log("Static files served from:", path.join(__dirname, "public"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// pazi na ovo u .env
const config = {
	authRequired: false,
	auth0Logout: true,
	secret: process.env.SECRET,
	clientID: process.env.CLIENT_ID,
	baseURL: "http://localhost:3000",
	issuerBaseURL: "https://dev-yve8c5e30eo5lzlq.us.auth0.com",
};

app.use(auth(config));
app.use("/", roundRoutes);
app.use("/", indexRoutes);
app.use("/", ticketRoutes);

app.get("/profile", requiresAuth(), (req, res) => {
	res.send(JSON.stringify(req.oidc.user));
});

app.listen(process.env.PORT, () => {
	console.log("Server is running on port 3000");
});
