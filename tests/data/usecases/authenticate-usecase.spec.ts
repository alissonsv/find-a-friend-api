import type { Org, Prisma } from "@prisma/client";

import { InvalidCredentialsError } from "#/data/errors/invalid-credentials-error";
import { AuthenticateUseCase } from "#/data/usecases/authenticate-usecase";
import type { IOrgRepository } from "#/domain/interfaces/repository/org-repository";
import { fakeOrg } from "#/tests/mock/fake-org";
import { hashPassword } from "#/utils/password-hash";

function createOrgRepositoryStub(): IOrgRepository {
	class OrgRepositoryStub implements IOrgRepository {
		async create(_data: Prisma.OrgCreateInput): Promise<Org> {
			return fakeOrg;
		}

		async findByEmail(_email: string): Promise<Org | null> {
			const hashedFakePassword = await hashPassword(fakeOrg.password);

			return {
				...fakeOrg,
				password: hashedFakePassword,
			};
		}
	}

	return new OrgRepositoryStub();
}

function makeSut() {
	const orgRepositoryStub = createOrgRepositoryStub();
	const sut = new AuthenticateUseCase(orgRepositoryStub);

	return {
		orgRepositoryStub,
		sut,
	};
}

describe("Authenticate UseCase", () => {
	test("Should return org if the email and password are correct", async () => {
		const { sut } = makeSut();

		await expect(
			sut.execute({
				email: fakeOrg.email,
				password: fakeOrg.password,
			}),
		).resolves.not.toBeNull();
	});

	test("Should throw InvalidCredentialsError if password is incorrect", async () => {
		const { sut } = makeSut();

		await expect(
			sut.execute({
				email: fakeOrg.email,
				password: `${fakeOrg.password}-wrong-pass`,
			}),
		).rejects.toThrow(InvalidCredentialsError);
	});

	test("Should throw InvalidCredentialsError if org does not exist", async () => {
		const { orgRepositoryStub, sut } = makeSut();

		jest.spyOn(orgRepositoryStub, "findByEmail").mockResolvedValueOnce(null);

		await expect(
			sut.execute({
				email: "mail@mail.com",
				password: "password",
			}),
		).rejects.toThrow(InvalidCredentialsError);
	});
});
