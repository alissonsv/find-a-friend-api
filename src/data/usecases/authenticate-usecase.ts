import type { Org } from "@prisma/client";
import type { IOrgRepository } from "#/domain/interfaces/repository/org-repository";
import { verifyPassword } from "#/utils/password-hash";
import { InvalidCredentialsError } from "../errors/invalid-credentials-error";

interface AuthenticateUseCaseRequest {
	email: string;
	password: string;
}

interface AuthenticateUseCaseResponse {
	org: Org;
}

export class AuthenticateUseCase {
	constructor(private orgRepository: IOrgRepository) {}

	async execute({
		email,
		password,
	}: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
		const org = await this.orgRepository.findByEmail(email);

		if (!org) {
			throw new InvalidCredentialsError();
		}

		const doesPasswordMatches = await verifyPassword(org.password, password);

		if (!doesPasswordMatches) {
			throw new InvalidCredentialsError();
		}

		return { org };
	}
}
