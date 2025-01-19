import type { Pet, Prisma } from "@prisma/client";
import type { IPetRepository } from "#/domain/interfaces/repository/pet-repository";
import { prismaClient } from "#/lib/prisma";

export class PrismaPetRepository implements IPetRepository {
	async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
		const pet = await prismaClient.pet.create({ data });

		return pet;
	}
}
