import { PrismaPetRepository } from "#/infra/repository/prisma/prima-pet-repository";
import { CreatePetUseCase } from "../create-pet-usecase";

export function makeCreatePetUseCase() {
	const petRepository = new PrismaPetRepository();

	return new CreatePetUseCase(petRepository);
}
