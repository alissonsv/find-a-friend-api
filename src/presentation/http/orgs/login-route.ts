import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { InvalidCredentialsError } from "#/data/errors/invalid-credentials-error";
import { makeAuthenticateUseCase } from "#/data/usecases/factories/make-authenticate-usecase";

export async function loginRoute(request: FastifyRequest, reply: FastifyReply) {
	const loginBodySchema = z.object({
		email: z.string().email(),
		password: z.string().min(6),
	});

	const parsedBodySchema = loginBodySchema.parse(request.body);
	const authenticateUseCase = makeAuthenticateUseCase();

	try {
		const { org } = await authenticateUseCase.execute(parsedBodySchema);

		const token = await reply.jwtSign({}, { sign: { sub: org.id } });

		const refreshToken = await reply.jwtSign(
			{},
			{ sign: { sub: org.id, expiresIn: "7d" } },
		);

		return reply
			.setCookie("refreshToken", refreshToken, {
				path: "/",
				secure: true,
				sameSite: true,
				httpOnly: true,
			})
			.status(200)
			.send({ token });
	} catch (error) {
		if (error instanceof InvalidCredentialsError) {
			return reply.status(401).send();
		}

		throw error;
	}
}
