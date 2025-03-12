# Tilli Careers

This website powers [careers.tilli.pro](https://careers.tilli.pro), where all Tilli hiring happens. We're building this into a mostly full-featured ATS, but at the moment it only accepts job applications and handles notifications related to those applications.

## Getting Started

1. Copy the `.env.example` to a `.env` file and fill in all the necessary variables (this includes setting up remote/ local DB).
2. Run `pnpm i`
3. Run `pnpm db:push` to get all prisma models into db
4. (Optional) Run `pnpm db:seed` to populate the db
5. Run `pnpm dev`

## Roadmap

- [x] (Q1 2025) Job application processing
- [x] (Q1 2025) Job application related notification
- [ ] (Q2 2025) Applicant and hiring manager authentication and user accounts
- [ ] (Q2 2025) Applicant portal
- [ ] (Q3 2025) Hiring manager portal
