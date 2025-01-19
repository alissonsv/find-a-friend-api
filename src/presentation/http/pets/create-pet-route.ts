import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { OrgAlreadyExistsError } from "#/data/errors/org-already-exists";
import { makeCreateOrgUseCase } from "#/data/usecases/factories/make-create-org-usecase";
import { makeCreatePetUseCase } from "#/data/usecases/factories/make-create-pet-usecase";

export async function createPetRoute(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const createPetBodySchema = z.object({
		name: z.string(),
		about: z.string(),
		age: z.enum(["PUPPY", "ADULT"]),
		size: z.enum(["SMALL", "MEDIUM", "LARGE"]),
		energyLevel: z.enum(["LOW", "MEDIUM", "HIGH"]),
		environment: z.enum(["SMALL", "MEDIUM", "LARGE"]),
		requirements: z.array(z.string()),
	});

	const parsedBodySchema = createPetBodySchema.parse(request.body);
	const createPetUseCase = makeCreatePetUseCase();

	await createPetUseCase.execute({
		...parsedBodySchema,
		orgId: request.user.sub,
	});

	return reply.status(201).send();
}
