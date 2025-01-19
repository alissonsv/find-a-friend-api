import type { Pet, Prisma } from "@prisma/client";

export interface IPetRepository {
	create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
}
