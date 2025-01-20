import type { Org, Pet } from "@prisma/client";
import type { IPetRepository } from "#/domain/interfaces/repository/pet-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface GetPetUseCaseRequest {
	petId: string;
}

interface GetPetUseCaseResponse {
	pet: Pet & {
		org: Org;
	};
}

export class GetPetUseCase {
	constructor(private petRepository: IPetRepository) {}

	async execute({
		petId,
	}: GetPetUseCaseRequest): Promise<GetPetUseCaseResponse> {
		const pet = await this.petRepository.findById(petId);

		if (!pet) {
			throw new ResourceNotFoundError();
		}

		return { pet };
	}
}
