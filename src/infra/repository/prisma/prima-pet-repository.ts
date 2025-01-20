import type { Org, Pet, Prisma } from "@prisma/client";
import type { IPetRepository } from "#/domain/interfaces/repository/pet-repository";
import { prismaClient } from "#/lib/prisma";

export class PrismaPetRepository implements IPetRepository {
	async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
		const pet = await prismaClient.pet.create({ data });

		return pet;
	}

	async findById(id: string): Promise<(Pet & { org: Org }) | null> {
		const pet = await prismaClient.pet.findUnique({
			where: {
				id,
			},
			include: {
				org: true,
			},
		});

		return pet;
	}
}
