import "dotenv/config";
import { PrismaClient, SocialLink } from "@prisma/client";
import { readFileSync } from "node:fs";

import seedData from "./seed/seed.json";

let spinner: ReturnType<typeof import("ora").default>;

async function main() {
  spinner.start("Connecting to db...");
  
  const db = new PrismaClient({
    log: ["warn", "error"],
    errorFormat: "pretty",
    transactionOptions: {
      maxWait: 60000,
      timeout: 60000,
    },
  });

  await db.$connect();
  
  spinner.text = "Finding current postings...";
  
  const postings = await db.jobPosting.findMany({
    where: {
      slug: {
        in: seedData.roles.map((role) => role.slug),
      }
    }
  });
  
  console.log(`\n\nFound ${postings.length} postings for ${seedData.roles.length} marked roles.\n\n`);
  
  if(postings.length > 0) {
    await Promise.all(postings.map((posting) => {
      spinner.text = `Updating ${posting.title}...`;
      
      const data = seedData.roles.find((role) => role.slug === posting.slug);
      
      if(!data) {
        return null;
      }
      
      return db.jobPosting.update({
        where: {
          id: posting.id
        },
        data: {
          title: data.title,
          description: data.description,
          post: readFileSync(`${process.cwd()}/prisma/seed/${data.post}`, "utf-8"),
          allowedSocials: data.allowedSocials as SocialLink[],
          salaryRange: data.salaryRange,
        }
      })
    }))
  }
  
  spinner.succeed("Updated postings.");
  
  return;
}


spinner = (await import("ora").then((mod) => mod.default))();
spinner.start();
spinner.prefixText = "🌿";
main()
  .catch((e) => {
    console.log(e);
    spinner.fail("Failed seeding.");
    console.log(e);
  })
  .finally(() => {
    process.exit(0)
  });