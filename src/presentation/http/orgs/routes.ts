import type { FastifyInstance } from "fastify";
import { loginRoute } from "./login-route";
import { refreshTokenRoute } from "./refresh-token-route";
import { registerRoute } from "./register-route";

export async function orgsRoutes(app: FastifyInstance) {
	app.post("/orgs", registerRoute);
	app.post("/orgs/login", loginRoute);
	app.patch("/orgs/token/refresh", refreshTokenRoute);
}
