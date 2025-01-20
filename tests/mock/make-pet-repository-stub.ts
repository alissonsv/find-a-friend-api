import { randomUUID } from "node:crypto";
import { faker } from "@faker-js/faker/.";
import type { Org, Pet, Prisma } from "@prisma/client";
import type { IPetRepository } from "#/domain/interfaces/repository/pet-repository";
import { fakeOrg } from "./fake-org";

const fakePet: Pet = {
	id: randomUUID(),
	name: faker.word.words(),
	about: faker.word.words(),
	age: "ADULT",
	energy_level: "MEDIUM",
	environment: "MEDIUM",
	size: "MEDIUM",
	requirements: [faker.word.sample(), faker.word.sample()],
	org_id: randomUUID(),
	created_at: new Date(),
	updated_at: new Date(),
};

export function makePetRepositoryStub(): IPetRepository {
	class PetRepositoryStub implements IPetRepository {
		async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
			return {
				...data,
				requirements: JSON.stringify(data.requirements),
				id: randomUUID(),
				created_at: new Date(),
				updated_at: new Date(),
			};
		}

		async findById(_id: string): Promise<(Pet & { org: Org }) | null> {
			return { ...fakePet, org: fakeOrg };
		}
	}

	return new PetRepositoryStub();
}
