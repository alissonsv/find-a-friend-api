import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { ResourceNotFoundError } from "#/data/errors/resource-not-found-error";
import { makeGetPetUsecase } from "#/data/usecases/factories/make-get-pet-usecase";

export async function getPetRoute(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const petIdSchema = z.object({
		petId: z.string(),
	});

	const { petId } = petIdSchema.parse(request.params);
	const getPetUsecase = makeGetPetUsecase();

	try {
		const { pet } = await getPetUsecase.execute({ petId });

		return reply.status(200).send({
			pet: {
				...pet,
				org_id: undefined,
			},
		});
	} catch (err) {
		if (err instanceof ResourceNotFoundError) {
			return reply.status(404).send();
		}

		throw err;
	}
}
