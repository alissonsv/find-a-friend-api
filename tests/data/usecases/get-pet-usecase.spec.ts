import { ResourceNotFoundError } from "#/data/errors/resource-not-found-error";
import { GetPetUseCase } from "#/data/usecases/get-pet-usecase";
import { makePetRepositoryStub } from "#/tests/mock/make-pet-repository-stub";

function makeSut() {
	const petRepositoryStub = makePetRepositoryStub();
	const sut = new GetPetUseCase(petRepositoryStub);

	return { sut, petRepositoryStub };
}

describe("Get Pet Usecase", () => {
	test("Should return a pet successfuly", async () => {
		const { sut } = makeSut();

		const { pet } = await sut.execute({ petId: "123-123123-123123" });

		expect(pet.id).toEqual(expect.any(String));
	});

	test("Should throw ResourceNotFound if pet was not found", async () => {
		const { sut, petRepositoryStub } = makeSut();

		jest.spyOn(petRepositoryStub, "findById").mockResolvedValueOnce(null);

		await expect(
			sut.execute({ petId: "123-123123123-123123123" }),
		).rejects.toThrow(ResourceNotFoundError);
	});
});
