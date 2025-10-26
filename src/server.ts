import express from "express";
import pkg from "express-openid-connect";
const { auth } = pkg;
import roundRoutes from "./routes/round.routes.js";
import indexRoutes from "./routes/index.routes.js";
import ticketRoutes from "./routes/ticket.routes.js";
import path from "path";
import { fileURLToPath } from "url";
import { externalUrl, port } from "./config/config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

const config = {
	authRequired: false,
	auth0Logout: true,
	secret: process.env.SECRET,
	clientID: process.env.CLIENT_ID,
	baseURL: externalUrl || `https://localhost:${port}`,
	issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}/`,
};

app.use(auth(config));
app.use("/", roundRoutes);
app.use("/", indexRoutes);
app.use("/", ticketRoutes);

if (externalUrl) {
	const hostname = "0.0.0.0"; //ne 127.0.0.1
	app.listen(port, hostname, () => {
		console.log(`Server locally running at http://${hostname}:${port}/ and from
			outside on ${externalUrl}`);
	});
} else {
	app.listen(process.env.PORT, () => {
		console.log("Server is running on port 3000");
	});
}
