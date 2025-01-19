import type { Pet } from "@prisma/client";
import type { IPetRepository } from "#/domain/interfaces/repository/pet-repository";

interface CreatePetUseCaseRequest {
	name: string;
	about: string;
	age: "PUPPY" | "ADULT";
	size: "SMALL" | "MEDIUM" | "LARGE";
	energyLevel: "LOW" | "MEDIUM" | "HIGH";
	environment: "SMALL" | "MEDIUM" | "LARGE";
	requirements: string[];
	orgId: string;
}

interface CreatePetUseCaseResponse {
	pet: Pet;
}

export class CreatePetUseCase {
	constructor(private petRepository: IPetRepository) {}

	async execute({
		name,
		about,
		age,
		size,
		energyLevel,
		environment,
		requirements,
		orgId,
	}: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
		const pet = await this.petRepository.create({
			name,
			about,
			age,
			size,
			energy_level: energyLevel,
			environment,
			requirements,
			org_id: orgId,
		});

		return { pet };
	}
}
