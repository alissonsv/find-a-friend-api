import type { Org } from "@prisma/client";
import type { IOrgRepository } from "#/domain/interfaces/repository/org-repository";
import { hashPassword } from "#/utils/password-hash";

interface CreateOrgUseCaseRequest {
	name: string;
	email: string;
	password: string;
	manager_name: string;
	whatsapp: string;
	address: string;
	cep: string;
	city: string;
}

interface CreateOrgUseCaseResponse {
	org: Org;
}

export class CreateOrgUseCase {
	constructor(private orgRepository: IOrgRepository) {}

	async execute({
		name,
		email,
		password,
		manager_name,
		whatsapp,
		address,
		cep,
		city,
	}: CreateOrgUseCaseRequest): Promise<CreateOrgUseCaseResponse> {
		const hashedPassword = await hashPassword(password);

		const org = await this.orgRepository.create({
			name,
			email,
			password: hashedPassword,
			manager_name,
			whatsapp,
			address,
			cep,
			city,
		});

		return { org };
	}
}
