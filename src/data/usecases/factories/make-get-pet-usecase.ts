import { PrismaPetRepository } from "#/infra/repository/prisma/prima-pet-repository";
import { GetPetUseCase } from "../get-pet-usecase";

export function makeGetPetUsecase() {
	const petRepository = new PrismaPetRepository();

	return new GetPetUseCase(petRepository);
}
