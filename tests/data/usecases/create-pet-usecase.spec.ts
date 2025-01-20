import { randomUUID } from "node:crypto";
import { faker } from "@faker-js/faker";

import { CreatePetUseCase } from "#/data/usecases/create-pet-usecase";
import { makePetRepositoryStub } from "#/tests/mock/make-pet-repository-stub";

function makeSut() {
	const petRepositoryStub = makePetRepositoryStub();
	const sut = new CreatePetUseCase(petRepositoryStub);

	return { sut, petRepositoryStub };
}

describe("Create Pet Usecase", () => {
	test("Should create a pet and return it", async () => {
		const { sut } = makeSut();
		const { pet } = await sut.execute({
			name: faker.word.words(),
			about: faker.word.words(),
			age: "ADULT",
			energyLevel: "MEDIUM",
			environment: "MEDIUM",
			size: "MEDIUM",
			requirements: [faker.word.sample(), faker.word.sample()],
			orgId: randomUUID(),
		});

		expect(pet.id).toEqual(expect.any(String));
	});
});
