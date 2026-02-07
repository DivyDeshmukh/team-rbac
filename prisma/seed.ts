import { Role } from "@/lib/generated/prisma/enums";
import { prisma } from "../lib/server/db/client";
import { hashPassword } from "@/lib/server/utils/auth.utils";

async function main() {
  console.log("Starting database seed...");

  // Create Teams
  const teams = await Promise.all([
    prisma.team.create({
      data: {
        name: "Engineering Alpha",
        description: "Engineering team alpha",
        code: "ENG-ALPHA",
      },
    }),
    prisma.team.create({
      data: {
        name: "Engineering Beta",
        description: "Engineering team beta",
        code: "ENG-BETA",
      },
    }),
    prisma.team.create({
      data: { name: "Product", description: "Product team", code: "PRD-001" },
    }),
    prisma.team.create({
      data: { name: "Design", description: "Design team", code: "DSN-001" },
    }),
    prisma.team.create({
      data: {
        name: "Quality Assurance",
        description: "QA team",
        code: "QA-001",
      },
    }),
    prisma.team.create({
      data: {
        name: "Marketing",
        description: "Marketing team",
        code: "MKT-001",
      },
    }),
    prisma.team.create({
      data: { name: "Sales", description: "Sales team", code: "SLS-001" },
    }),
    prisma.team.create({
      data: { name: "Human Resources", description: "HR team", code: "HR-001" },
    }),
    prisma.team.create({
      data: {
        name: "Customer Support",
        description: "Support team",
        code: "SUP-001",
      },
    }),
    prisma.team.create({
      data: {
        name: "Operations",
        description: "Operations team",
        code: "OPS-001",
      },
    }),
  ]);

  console.log(
    "Teams seeded:",
    teams.map((t) => t.code),
  );

  console.log("Seeding users...");

  const users = [
    // Super Admin — no team
    {
      name: "Super Admin",
      email: "admin@company.com",
      role: Role.ADMIN,
      teamIndex: null,
    },

    // Engineering Alpha
    {
      name: "Alpha Manager",
      email: "alpha.manager@company.com",
      role: Role.MANAGER,
      teamIndex: 0,
    },
    {
      name: "Alice Alpha",
      email: "alice.alpha@company.com",
      role: Role.USER,
      teamIndex: 0,
    },
    {
      name: "Aaron Alpha",
      email: "aaron.alpha@company.com",
      role: Role.USER,
      teamIndex: 0,
    },
    {
      name: "Amy Alpha",
      email: "amy.alpha@company.com",
      role: Role.USER,
      teamIndex: 0,
    },

    // Engineering Beta
    {
      name: "Beta Manager",
      email: "beta.manager@company.com",
      role: Role.MANAGER,
      teamIndex: 1,
    },
    {
      name: "Bob Beta",
      email: "bob.beta@company.com",
      role: Role.USER,
      teamIndex: 1,
    },
    {
      name: "Bella Beta",
      email: "bella.beta@company.com",
      role: Role.USER,
      teamIndex: 1,
    },
    {
      name: "Ben Beta",
      email: "ben.beta@company.com",
      role: Role.USER,
      teamIndex: 1,
    },

    // Product
    {
      name: "Product Manager",
      email: "product.manager@company.com",
      role: Role.MANAGER,
      teamIndex: 2,
    },
    {
      name: "Pam Product",
      email: "pam.product@company.com",
      role: Role.USER,
      teamIndex: 2,
    },
    {
      name: "Pete Product",
      email: "pete.product@company.com",
      role: Role.USER,
      teamIndex: 2,
    },
    {
      name: "Perry Product",
      email: "perry.product@company.com",
      role: Role.USER,
      teamIndex: 2,
    },

    // Design
    {
      name: "Design Manager",
      email: "design.manager@company.com",
      role: Role.MANAGER,
      teamIndex: 3,
    },
    {
      name: "Daisy Design",
      email: "daisy.design@company.com",
      role: Role.USER,
      teamIndex: 3,
    },
    {
      name: "Derek Design",
      email: "derek.design@company.com",
      role: Role.USER,
      teamIndex: 3,
    },
    {
      name: "Donna Design",
      email: "donna.design@company.com",
      role: Role.USER,
      teamIndex: 3,
    },

    // Quality Assurance
    {
      name: "QA Manager",
      email: "qa.manager@company.com",
      role: Role.MANAGER,
      teamIndex: 4,
    },
    {
      name: "Quinn QA",
      email: "quinn.qa@company.com",
      role: Role.USER,
      teamIndex: 4,
    },
    {
      name: "Quincy QA",
      email: "quincy.qa@company.com",
      role: Role.USER,
      teamIndex: 4,
    },
    {
      name: "Quest QA",
      email: "quest.qa@company.com",
      role: Role.USER,
      teamIndex: 4,
    },

    // Marketing
    {
      name: "Marketing Manager",
      email: "marketing.manager@company.com",
      role: Role.MANAGER,
      teamIndex: 5,
    },
    {
      name: "Mandy Marketing",
      email: "mandy.marketing@company.com",
      role: Role.USER,
      teamIndex: 5,
    },
    {
      name: "Mark Marketing",
      email: "mark.marketing@company.com",
      role: Role.USER,
      teamIndex: 5,
    },
    {
      name: "Moe Marketing",
      email: "moe.marketing@company.com",
      role: Role.USER,
      teamIndex: 5,
    },

    // Sales
    {
      name: "Sales Manager",
      email: "sales.manager@company.com",
      role: Role.MANAGER,
      teamIndex: 6,
    },
    {
      name: "Sam Sales",
      email: "sam.sales@company.com",
      role: Role.USER,
      teamIndex: 6,
    },
    {
      name: "Sara Sales",
      email: "sara.sales@company.com",
      role: Role.USER,
      teamIndex: 6,
    },
    {
      name: "Sean Sales",
      email: "sean.sales@company.com",
      role: Role.USER,
      teamIndex: 6,
    },

    // Human Resources
    {
      name: "HR Manager",
      email: "hr.manager@company.com",
      role: Role.MANAGER,
      teamIndex: 7,
    },
    {
      name: "Helen HR",
      email: "helen.hr@company.com",
      role: Role.USER,
      teamIndex: 7,
    },
    {
      name: "Harry HR",
      email: "harry.hr@company.com",
      role: Role.USER,
      teamIndex: 7,
    },
    {
      name: "Holly HR",
      email: "holly.hr@company.com",
      role: Role.USER,
      teamIndex: 7,
    },

    // Customer Support
    {
      name: "Support Manager",
      email: "support.manager@company.com",
      role: Role.MANAGER,
      teamIndex: 8,
    },
    {
      name: "Steve Support",
      email: "steve.support@company.com",
      role: Role.USER,
      teamIndex: 8,
    },
    {
      name: "Sandra Support",
      email: "sandra.support@company.com",
      role: Role.USER,
      teamIndex: 8,
    },
    {
      name: "Seth Support",
      email: "seth.support@company.com",
      role: Role.USER,
      teamIndex: 8,
    },

    // Operations
    {
      name: "Operations Manager",
      email: "ops.manager@company.com",
      role: Role.MANAGER,
      teamIndex: 9,
    },
    {
      name: "Olivia Ops",
      email: "olivia.ops@company.com",
      role: Role.USER,
      teamIndex: 9,
    },
    {
      name: "Oscar Ops",
      email: "oscar.ops@company.com",
      role: Role.USER,
      teamIndex: 9,
    },
    {
      name: "Opal Ops",
      email: "opal.ops@company.com",
      role: Role.USER,
      teamIndex: 9,
    },
  ];

  for (const userData of users) {
    await prisma.user.create({
      data: {
        email: userData.email,
        name: userData.name,
        password: await hashPassword("12345678"),
        role: userData.role,
        team:
          userData.teamIndex !== null
            ? { connect: { id: teams[userData.teamIndex].id } }
            : undefined,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error("Seeding Failed: ", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
