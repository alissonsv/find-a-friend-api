import { execSync } from "node:child_process";

async function globalSetup() {
	try {
		execSync("npx prisma migrate deploy");
	} catch (error) {
		console.error("Error in global setup:", error);
		throw error;
	}
}

export default globalSetup;
