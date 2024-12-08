import type { FastifyInstance } from "fastify";
import { registerRoute } from "./register-route";

export async function orgsRoutes(app: FastifyInstance) {
	app.post("/orgs", registerRoute);
}
