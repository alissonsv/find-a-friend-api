import type { FastifyInstance } from "fastify";
import { verifyJWT } from "../middlewares/verify-jwt";
import { createPetRoute } from "./create-pet-route";
import { getPetRoute } from "./get-pet-route";

export async function petsRoutes(app: FastifyInstance) {
	app.post("/pets", { onRequest: verifyJWT }, createPetRoute);
	app.get("/pets/:petId", getPetRoute);
}
