import type { FastifyInstance } from "fastify";
import { verifyJWT } from "../middlewares/verify-jwt";
import { createPetRoute } from "./create-pet-route";

export async function petsRoutes(app: FastifyInstance) {
	app.addHook("onRequest", verifyJWT);

	app.post("/pets", createPetRoute);
}
