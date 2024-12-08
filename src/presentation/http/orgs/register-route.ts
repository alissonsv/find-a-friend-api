import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeCreateOrgUseCase } from "#/data/usecases/factories/make-create-org-usecase";

export async function registerRoute(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const registerBodySchema = z.object({
		name: z.string().min(2),
		email: z.string().email(),
		password: z.string().min(6),
		managerName: z.string().min(2),
		whatsapp: z.string().min(6),
		address: z.string(),
		cep: z.string().length(8),
		city: z.string(),
	});

	const parsedBodySchema = registerBodySchema.parse(request.body);
	const createOrgUseCase = makeCreateOrgUseCase();
	await createOrgUseCase.execute(parsedBodySchema);

	return reply.status(201).send();
}
