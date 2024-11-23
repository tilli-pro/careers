import { PrismaClient, SocialLink } from "@prisma/client";
import { readFile } from "node:fs/promises";

import seedData from "./seed.json";

async function main() {
  const db = new PrismaClient();

  await db.$connect();

  await db.jobPosting.deleteMany();
  await db.jobLocation.deleteMany();
  await db.department.deleteMany();
  await db.hiringManager.deleteMany();
  await db.interviewer.deleteMany();
  await db.applicant.deleteMany();
  await db.user.deleteMany();

  const { roles, departments, locations, hiringManagers } = seedData;

  const dbLocations = await db.jobLocation.createManyAndReturn({
    data: locations,
  });

  const dbDepartments = await db.department.createManyAndReturn({
    data: departments,
  });

  const dbUsers = await db.user.createManyAndReturn({
    data: hiringManagers,
  });

  const dbHiringManagers = await db.hiringManager.createManyAndReturn({
    data: dbUsers.map((user) => ({
      userId: user.id,
    })),
  });

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
}

if ((process.env.NODE_ENV ?? "development") === "development") {
  console.log("Seeding database...");
  main().catch((e) => {
    console.log(e);
  });
}
