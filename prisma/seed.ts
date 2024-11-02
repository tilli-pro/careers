import { PrismaClient } from "@prisma/client";

async function main() {
  const db = new PrismaClient();

  await db.$connect();

  await db.jobPosting.deleteMany();
  await db.jobLocation.deleteMany();
  await db.department.deleteMany();
  await db.hiringManager.deleteMany();

  await db.jobPosting.create({
    data: {
      title: "Fullstack Engineer",
      slug: "fse-1122",
      description: "",
      location: {
        create: {
          location: "McLean, VA",
        },
      },
      post: "# Fullstack Engineer\n\n## Welcome to Tilli",
      allowedSocials: ["PERSONAL", "GITHUB", "LINKEDIN"],
      salaryRange: [70_000, 90_000],
      department: {
        create: {
          name: "Engineering",
        },
      },
      hiringManager: {
        create: {
          user: {
            create: {
              name: "Ibrahim Ali",
              email: "ibrahims@tilli.pro",
            },
          },
        },
      },
    },
  });
}

if ((process.env.NODE_ENV ?? "development") === "development") {
  console.log("Seeding database...");
  main().catch((e) => {
    console.log(e);
  });
}
