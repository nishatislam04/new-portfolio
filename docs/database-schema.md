# Portfolio Database & Prisma Schema Design

This document explains the **data model** that powers the portfolio, how it maps from the current `src/constants` data, and why it is intentionally designed to be **flexible, loosely-typed where it matters, and admin‑UI friendly**.

The goal is:

- **No more hardcoded constants** for portfolio content.
- A schema that **mirrors the current UI** (Hero, About, Work Experience, Education, Projects, Contact, CTA, Toolbox, Footer).
- Enough structure to build a **good admin panel**, but **not so strict** that content changes become painful.
- Support for **highly customizable, nested, and evolving data** (projects, toolbox items, stats, etc.).

---

## 1. High‑Level Shape

At the top level, there is **one main `Profile`**. Everything else hangs off of this profile via relations:

- `Profile`
  - `SocialLink[]`
  - `WorkExperience[]`
  - `Education[]`
  - `ToolboxCategory[]`
  - `PortfolioProject[]`
  - `Achievement[]`
  - `ProfileStats` (1:1)
  - `NavigationItem[]`
  - `TapeWord[]`

This exactly mirrors how `PERSONAL_INFO` is currently the **single source of truth** for the portfolio.

### Why one Profile root?

- Your app today assumes a **single person** / single portfolio.
- Starting with one `Profile` keeps things simple, but the `slug` field means you can **add more profiles later** (multi‑tenant portfolio) without redesigning everything.
- The admin panel can always scope everything by `profileId`, which simplifies permissions and UI queries.

---

## 2. Profile

```prisma
model Profile {
  id           String   @id @default(cuid())
  slug         String   @unique

  name         String
  title        String?
  bio          String?

  email        String?
  phone        String?
  location     String?
  locationLink String?
  availability String?

  skills       Json?
  techStack    Json?

  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  socialLinks       SocialLink[]
  workExperiences   WorkExperience[]
  educationEntries  Education[]
  toolboxCategories ToolboxCategory[]
  portfolioProjects PortfolioProject[]
  achievements      Achievement[]
  stats             ProfileStats?
  navigationItems   NavigationItem[]
  tapeWords         TapeWord[]
}
```

### Mapping from constants

From `src/constants/personal-info.ts`:

- `PERSONAL_INFO.name` → `Profile.name`
- `PERSONAL_INFO.title` → `Profile.title`
- `PERSONAL_INFO.profile` → `Profile.bio`
- `PERSONAL_INFO.email` → `Profile.email`
- `PERSONAL_INFO.phone` → `Profile.phone`
- `PERSONAL_INFO.location` → `Profile.location`
- `PERSONAL_INFO.locationLink` → `Profile.locationLink`
- `PERSONAL_INFO.availability` → `Profile.availability`
- `PERSONAL_INFO.skills` (string array) → `Profile.skills` (JSON string[])
- `PERSONAL_INFO.techStack` (string array) → `Profile.techStack` (JSON string[])

Additionally, we introduce:

- `slug` – a **stable identifier** (`"nishat-mazumder"`) for routing/admin scoping.

### Why `Json` for skills & techStack?

- Today they are **simple string arrays**, but in the future you might want richer structures:
  - Add categories, icons, URLs, etc.
- Using `Json` keeps the **DB schema stable** while the **UI schema can evolve**.
- Admin UI can treat them as `string[]` initially but later as `[{ name, category, icon }]` without DB migrations.

---

## 3. SocialLink

```prisma
model SocialLink {
  id        String  @id @default(cuid())
  profileId String

  label     String
  url       String
  icon      String?
  kind      String?

  isPrimary Boolean @default(true)
  isPublic  Boolean @default(true)
  sortOrder Int     @default(0)

  profile Profile @relation(fields: [profileId], references: [id], onDelete: Cascade)

  @@index([profileId])
}
```

### Mapping from constants

From `PERSONAL_INFO.SOCIAL_LINKS` (used in Contact + Footer):

- `name` → `label`
- `url` → `url`
- `icon` → `icon` (e.g. `"gmail"`, `"linkedin"`)

The seed also adds a GitHub contact link using `PERSONAL_INFO.CONTACT_INFO.github`.

### Why separate model instead of JSON list?

- You use social links in **multiple sections** (Contact, Footer) and you care about **sort order**.
- Admin UI wants to **add / remove / reorder** – this is far easier with rows + `sortOrder`.
- It also lets you filter by `kind` (e.g. `"social"` vs `"contact"`) if needed.

---

## 4. WorkExperience

```prisma
model WorkExperience {
  id        String   @id @default(cuid())
  profileId String

  company   String
  position  String
  location  String?
  type          String?
  durationLabel String?
  startLabel    String?
  endLabel      String?

  description String?

  achievements Json?
  technologies Json?

  isCurrent Boolean  @default(false)
  isPublic  Boolean  @default(true)
  sortOrder Int      @default(0)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  profile Profile @relation(fields: [profileId], references: [id], onDelete: Cascade)

  @@index([profileId])
}
```

### Mapping from constants

From `PERSONAL_INFO.workExperience`:

- `company` → `company`
- `position` → `position`
- `duration` → `durationLabel` (full free‑text like `"July 2024 - Current"`)
- `startDate` (string) → `startLabel`
- `endDate` (string) → `endLabel`
- `location` → `location`
- `type` → `type`
- `description` → `description`
- `achievements: string[]` → `achievements` (JSON string[])
- `technologies: string[]` → `technologies` (JSON string[])

### Why `string` labels instead of `DateTime` fields?

- Your UI displays **human‑readable ranges** like `"July 2024 - Current"`.
- Converting to strict dates doesn’t buy you much and makes editing more rigid.
- Using `durationLabel`, `startLabel`, `endLabel` keeps this **simple for content editing**.

### Why no `WorkAchievement` / `WorkTechnology` tables?

The draft schema had separate tables:

- `WorkAchievement` (one row per bullet)
- `WorkTechnology` (one row per string)

We simplified them into **JSON arrays** because:

- They are always **tightly coupled** to a single `WorkExperience` entry.
- You rarely need to filter across all experiences by a single achievement row.
- Admin UI still exposes them as array fields.
- It avoids **3 extra tables and 2 extra relations** while keeping all capabilities you need.

---

## 5. Education

```prisma
model Education {
  id        String   @id @default(cuid())
  profileId String

  degree        String?
  institution   String?
  durationLabel String?
  gpa           String?
  maxGpa        String?
  description   String?

  highlights Json?

  isPublic  Boolean  @default(true)
  sortOrder Int      @default(0)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  profile Profile @relation(fields: [profileId], references: [id], onDelete: Cascade)

  @@index([profileId])
}
```

### Mapping from constants

From `PERSONAL_INFO.education`:

- `degree` → `degree`
- `institution` → `institution`
- `duration` → `durationLabel` (e.g. `"2021 - 2024"`)
- `gpa` → `gpa` (string)
- `maxGpa` → `maxGpa` (string)
- `description` → `description`
- `highlights: string[]` → `highlights` (JSON string[])

### Why `string` GPA instead of numeric `Decimal`?

- Your constants store GPA as strings (`"3.72"`, `"4.0"`).
- For a portfolio, GPA is **purely display content**, not used in numeric queries.
- Keeping it as `string` avoids unnecessary parsing and lets you change format (e.g. `"3.72 / 4.00"`) freely.

### Why no `EducationHighlight` table?

Same philosophy as WorkExperience bullets:

- `highlights` are **bullets tightly bound** to a single education entry.
- JSON list is enough and much simpler than an extra table.

---

## 6. ToolboxCategory

```prisma
model ToolboxCategory {
  id        String   @id @default(cuid())
  profileId String

  slug      String
  title     String
  color     String?

  items     Json

  isPublic  Boolean  @default(true)
  sortOrder Int      @default(0)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  profile Profile @relation(fields: [profileId], references: [id], onDelete: Cascade)

  @@index([profileId])
  @@unique([profileId, slug])
}
```

### Mapping from constants

From `PERSONAL_INFO.toolboxCategories`:

- `id` (e.g. `"languages"`) → `slug`
- `title` → `title`
- `color` (`"emerald"`, `"sky"`, etc.) → `color`
- `items: { title, icon }[]` → `items` (JSON array)

### Why `Json` for `items`?

- Items are small nested objects: `{ title, icon }`.
- You don’t need to reuse them across categories.
- Admin UI just needs to **edit a list of items per category**.
- JSON avoids an extra `ToolboxItem` table and keeps things easy to evolve (add `url`, `level`, etc.).

---

## 7. PortfolioProject

```prisma
model PortfolioProject {
  id        String   @id @default(cuid())
  profileId String

  slug   String
  title  String
  company String?
  year    String?

  status   String?
  category String?

  shortDescription String?
  fullDescription  String?

  keyFeatures Json?
  results     Json?
  coverImage  Json?
  images      Json?
  technologies Json?
  architecture Json?
  challenges   Json?
  solutions    Json?
  links        Json?
  tags         Json?

  featured Boolean @default(false)
  priority Int     @default(0)

  hasLiveDemo Boolean? @default(false)
  isPrivate    Boolean? @default(false)
  isComingSoon Boolean? @default(false)
  isPublic     Boolean  @default(true)
  sortOrder    Int      @default(0)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  profile Profile @relation(fields: [profileId], references: [id], onDelete: Cascade)

  @@index([profileId])
  @@unique([profileId, slug])
}
```

### Mapping from constants

From `PERSONAL_INFO.portfolioProjects` and `src/types/project.ts`:

- `id` (constant) → `slug` (human‑friendly id)
- `title`, `company`, `year`, `category` → same fields
- `status` (union in TS) → `status` (free `String` in DB)
- `shortDescription`, `fullDescription` → same
- `keyFeatures: string[]` → `keyFeatures` (JSON string[])
- `results: { title }[]` → `results` (JSON objects)
- `coverImage: { src, alt, priority }` → `coverImage` (JSON object)
- `images: { src, alt }[]` → `images` (JSON array)
- `technologies: string[]` → `technologies` (JSON array)
- `architecture`, `challenges`, `solutions` (where present) → separate JSON arrays
- `links: { type, url, label }[]` → `links` (JSON)
- `tags: string[]` → `tags` (JSON)
- `featured`, `priority`, `hasLiveDemo`, `isPrivate`, `isComingSoon` → mapped directly

### Why so much JSON here?

Projects are where your content is **rich and evolving**:

- You already have different shapes per project (some with galleries, some without; some with architecture/challenges/solutions, some without).
- In the future, you may add **more structured sections** per project.
- Normalizing everything would create a **large number of tables and joins** for very small, tightly coupled bits of content.

Using JSON here keeps:

- **Maximum flexibility** for the admin UI.
- **Minimal migration overhead** when you want to change how projects look.
- A clear mapping from your existing `Project` TypeScript type.

The price is you don’t get cross‑project queries like “give me all projects that contain the `PostgreSQL` technology” via pure SQL filtering, but for a portfolio that’s almost never needed.

---

## 8. ProfileStats

```prisma
model ProfileStats {
  id        String @id @default(cuid())
  profileId String @unique

  experienceLabel         String?
  projectsCompletedLabel  String?
  technologiesLabel       String?
  clientSatisfactionLabel String?

  profile Profile @relation(fields: [profileId], references: [id], onDelete: Cascade)
}
```

### Mapping from constants

From `PERSONAL_INFO.stats`:

- `experience` (`"1+"`) → `experienceLabel`
- `projectsCompleted` (`"10+"`) → `projectsCompletedLabel`
- `technologies` (`"20+"`) → `technologiesLabel`
- `clientSatisfaction` (`"100%"`) → `clientSatisfactionLabel`

### Why labels instead of numbers?

- The CTA section (`AnimatedCounter`) uses these as **display values** and they can include `+` or `%`.
- They are not real numeric KPIs – no need for numeric types and parsing.

---

## 9. Achievement

```prisma
model Achievement {
  id        String   @id @default(cuid())
  profileId String

  info   String?
  number String?
  text   String?

  isPublic  Boolean  @default(true)
  sortOrder Int      @default(0)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  profile Profile @relation(fields: [profileId], references: [id], onDelete: Cascade)

  @@index([profileId])
}
```

### Mapping from constants

From `PERSONAL_INFO.achievements`:

- `info` → `info`
- `number` → `number`
- `text` → `text`

These drive the **About → Key Highlights** cards.


---

## 10. NavigationItem & TapeWord

These two models cover **`src/constants/index.ts`**, which is currently also hardcoded.

```prisma
model NavigationItem {
  id        String   @id @default(cuid())
  profileId String?

  label     String
  href      String

  sortOrder Int      @default(0)
  isPublic  Boolean  @default(true)

  profile Profile? @relation(fields: [profileId], references: [id], onDelete: SetNull)

  @@index([profileId])
}

model TapeWord {
  id        String   @id @default(cuid())
  profileId String?

  value     String

  sortOrder Int      @default(0)
  isPublic  Boolean  @default(true)

  profile Profile? @relation(fields: [profileId], references: [id], onDelete: SetNull)

  @@index([profileId])
}
```

### Mapping from constants

From `src/constants/index.ts`:

- `NAV_ITEMS: { name, href }[]` → `NavigationItem` rows (`label`, `href`, `sortOrder`)
- `TAPE_WORDS: string[]` → `TapeWord` rows (`value`, `sortOrder`)

This means your **header navigation** and **tape section** become editable through the admin panel as well.

---

## 11. What We Simplified vs the Draft Schema

Your draft schema from the previous chat was more normalized and strict. Here are the main differences:

### Removed / simplified tables

- **`WorkAchievement` + `WorkTechnology`** → replaced by `achievements: Json`, `technologies: Json` on `WorkExperience`.
- **`EducationHighlight`** → replaced by `highlights: Json` on `Education`.
- **`Skill`** model → replaced by `skills: Json` and `techStack: Json` on `Profile`.
- **`Status` enum** → replaced by free‑form `status: String?` on `PortfolioProject`.

### Why this is better for your use‑case

- These values are **presentation‑only**, not used for complex relational queries.
- You often deal with them as **arrays on a single card** (work entry, education entry, project), not as standalone entities.
- JSON keeps things **loose and easy to change** while still being strongly typed in TypeScript at the app layer.

### What we added beyond the draft

- **`NavigationItem`** and **`TapeWord`** to remove remaining hardcoded UI constants.
- **`slug`** on `Profile` and `PortfolioProject` for admin‑friendly routing.
- Flexible **JSON columns** for project details (`coverImage`, `images`, `architecture`, `challenges`, `solutions`, `links`, `tags`).

---

## 12. Seed Strategy

We introduced two pieces for seeding:

- `prisma/seed-data.ts` – a **typed snapshot** of the current constants, but without image imports.
- `prisma/seed.ts` – the **Prisma seeder** that writes this data into the DB.

### Why a separate `seed-data.ts` instead of importing directly from `src/constants/personal-info.ts`?

- Your constants file imports **Next.js image modules**, which don’t make sense in a pure Node.js seed context.
- The seed only needs **semantic keys** (like `"teamDocsCover"`), not actual image binaries.
- Keeping seed data **framework‑agnostic** avoids coupling Prisma seeding to Next.js build behavior.

### How the seed works

1. Connects to Postgres using `DATABASE_URL`.
2. Looks for an existing `Profile` with the `seedProfile.slug`.
   - If found, deletes it for a **clean, idempotent** reseed.
3. Creates the `Profile` root.
4. Inserts child data in this order:
   - `SocialLink` (from `seedProfile.socialLinks`)
   - `WorkExperience` (from `seedProfile.workExperience`)
   - `Education` (from `seedProfile.education`)
   - `ProfileStats` (from `seedProfile.stats`)
   - `Achievement` (from `seedProfile.achievements`)
   - `ToolboxCategory` (from `seedProfile.toolbox`)
   - `PortfolioProject` (from `seedProfile.projects`)
   - `NavigationItem` (from `NAV_ITEMS` constants)
   - `TapeWord` (from `TAPE_WORDS` constants)

Running:

```bash
npm run db:generate    # npx prisma generate
npm run db:push        # or db:migrate when you start using migrations
npm run db:seed
```

will populate the database so that **all sections of your portfolio can be powered by the DB** instead of hardcoded constants.

> **Note:** After editing `schema.prisma`, always re‑run `npm run db:generate` so that TypeScript types for `PrismaClient` include all the new models.

---

## 13. How This Supports the Future Admin Panel

With this schema:

- The admin UI can use **simple CRUD screens** per entity:
  - Profile basics (name, title, bio, contact info, skills, tech stack)
  - Social links (list + reorder)
  - Work experiences (list with achievements/technologies arrays)
  - Education entries (GPA + highlights)
  - Toolbox categories with items (nested array editor)
  - Projects (rich forms, repeaters for features/results, JSON‑backed advanced fields)
  - Stats, Achievements, Navigation, Tape words
- Relations are **straightforward** (mostly `profileId` foreign keys).
- JSON fields give you room to **iterate the content model** without constant DB migrations.
- You can add **visibility flags** (`isPublic`, `isPrivate`, `isComingSoon`) to control what is shown.

---

## 14. What Might Still Be Missing / Future Extensions

A few ideas you might want later (but we intentionally did not bake into the first version):

- **Auth & Admin users** – currently the `User` model is still just a placeholder. Once you finalize how `better-auth` will be used, you can extend or replace it.
- **Audit fields** like `createdBy` / `updatedBy` (admins) on key content tables.
- **Draft vs published** states for projects or major sections.
- **Multi‑profile** support: additional `Profile` rows, each with their own content, reusing the same schema.
- **More structured project tech**: if you ever need **tech filters** (e.g. query DB for all `Next.js` projects), you might normalize technologies into a separate table instead of JSON.

---

## 15. Summary of Improvements

- **Constants → Database**: Everything previously hardcoded (`PERSONAL_INFO`, `NAV_ITEMS`, `TAPE_WORDS`) now has a home in the DB.
- **Flexible, not over‑normalized**: We avoided unnecessary join tables by pushing bullets, lists, and nested objects into JSON fields where that makes sense.
- **Admin‑friendly**: Every piece of content your UI uses lives in its own table or JSON field, ready for a CRUD UI.
- **Future‑proof**: You can grow the content model (especially for projects and toolbox) without major DB migrations.

This schema is designed to be **practical for a portfolio**: easy to reason about, straightforward to seed, and flexible enough to support a rich admin panel experience without becoming an over‑engineered CMS.
