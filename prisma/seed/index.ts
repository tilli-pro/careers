import { PrismaClient, SocialLink } from "@prisma/client";
import { readFile } from "node:fs/promises";

import seedData from "./seed.json";

const FLAGS = process.argv.slice(2);
const CLEAR_ONLY = FLAGS.includes("--clear");

let spinner: ReturnType<typeof import("ora").default>;

async function main() {
  const db = new PrismaClient({
    log: ["warn", "error"],
    errorFormat: "pretty",
    transactionOptions: {
      maxWait: 60000,
      timeout: 60000,
    },
  });

  await db.$connect();

  spinner.text = "Clearing database...";

  await db.jobApplication.deleteMany();
  await db.jobPosting.deleteMany();
  await db.jobLocation.deleteMany();
  await db.department.deleteMany();
  await db.hiringManager.deleteMany();
  await db.interviewer.deleteMany();
  await db.applicant.deleteMany();
  await db.user.deleteMany();

  spinner.succeed("Database cleared");

  if (!CLEAR_ONLY) {
    spinner.start("Seeding database...");

    const { roles, departments, locations, hiringManagers } = seedData;

    spinner.suffixText = "[locations]";
    const dbLocations = await db.jobLocation.createManyAndReturn({
      data: locations,
    });

    spinner.suffixText = "[departments]";
    const dbDepartments = await db.department.createManyAndReturn({
      data: departments,
    });

    spinner.suffixText = "[users]";
    const dbUsers = await db.user.createManyAndReturn({
      data: hiringManagers,
    });

    spinner.suffixText = "[hiring]";
    const dbHiringManagers = await db.hiringManager.createManyAndReturn({
      data: dbUsers.map((user) => ({
        userId: user.id,
      })),
    });

    spinner.suffixText = "[roles]";
    for (const role of roles) {
      await db.jobPosting.create({
        data: {
          title: role.title,
          slug: role.slug,
          description: role.description,
          post: await readFile(
            `${process.cwd()}/prisma/seed/${role.post}`,
            "utf-8",
          ),
          allowedSocials: role.allowedSocials as SocialLink[],
          salaryRange: role.salaryRange,
          locationId: dbLocations[role.location]?.id ?? "",
          departmentId: dbDepartments[role.department]?.id ?? "",
          hiringManagerId: dbHiringManagers[role.hiringManager]?.id ?? "",
        },
      });
    }
    spinner.suffixText = "";
    spinner.succeed("Database seeded.");
  }
}

if ((process.env.NODE_ENV ?? "development") === "development") {
  spinner = (await import("ora").then((mod) => mod.default))();
  spinner.start();
  spinner.prefixText = "🌿";
  main()
    .catch((e) => {
      console.log(e);
      spinner.fail("Failed seeding.");
      console.log(e);
    })
    .finally(() => {});
}
