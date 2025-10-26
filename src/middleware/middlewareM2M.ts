import { expressjwt } from "express-jwt";
import JwksRsa from "jwks-rsa";

const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN;

export const requiresM2MToken = expressjwt({
	secret: JwksRsa.expressJwtSecret({
		cache: true,
		rateLimit: true,
		jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
	}),
	audience: process.env.API_AUDIENCE,
	issuer: `https://${process.env.AUTH0_DOMAIN}/`,
	algorithms: ["RS256"],
});
