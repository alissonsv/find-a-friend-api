import type { Org, Pet, Prisma } from "@prisma/client";

export interface IPetRepository {
	create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
	findById(id: string): Promise<(Pet & { org: Org }) | null>;
}
