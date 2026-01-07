# Icons & Media Architecture

This document defines how **icons** and **images** should be handled in the new DB‑driven version of the portfolio, with a future admin panel in mind and deployment on **Vercel**.

Goals:

- **Remove hardcoded content** from code, while keeping a clean developer experience.
- Keep **UI/icons consistent with the current design system** (emerald gradients, SVGs, etc.).
- Support a future **admin panel** that can create/update/delete content (projects, toolbox, links, etc.).
- Handle **icons and images safely** in a way that works well on Vercel.
- Avoid over‑engineering for a single‑user personal portfolio.

---

## 1. Current State (Summary)

### 1.1 Technologies & Config

- **Next.js** App Router, hosted on Vercel.
- **Icons**
  - Local SVG/PNG/JPEG assets in `src/assets/icons/**`.
  - Converted into React components via **SVGR**:
    - `next.config.mjs` has a Turbopack rule:
      - `"*.svg"` → `@svgr/webpack` with `svgo` and `removeViewBox: false`.
- **Images**
  - Local images in `src/assets/images/**`.
  - `projectImages` and `memojiImages` in `src/assets/images/index.ts`.
  - Used heavily for:
    - Project covers & galleries (`ProjectCard`, `ProjectModal`, `ImageCarousel`).
    - Hero background grain, memoji, etc.

### 1.2 How Icons Are Used Today

- **UI / decorative icons** (never user‑editable):
  - Hero: `ArrowDownIcon`, `ArrowUpRightIcon`, `SparkleIcon`, `StarIcon`, `ViewIcon`.
  - WorkExperience: `BriefcaseIcon`, `CalendarIcon`, `MapPinIcon`, `CheckCircleIcon`.
  - Various buttons: arrows, close icons, chevrons, etc.
  - These are purely **presentation**, not content.

- **Content‑related icons** (tied to data):
  - **Toolbox (tech stack rows)** – `ToolboxRow.tsx`:
    - `PERSONAL_INFO.toolboxCategories[].items` have `{ title, icon: string }`.
    - `ToolboxRow` has an `iconComponents` map from **icon key** (`"js"`, `"docker"`, etc.) to imported PNG/SVG.
  - **About tech stack** – `About.tsx` + `TechStackCard.tsx`:
    - Hardcoded `techStacks = [{ name, icon: <NextJSIcon /> }, ...]`.
    - SVG icons get a gradient fill via `TechStackCard` (`fill-[url(#tech-icon-gradient)]`).
  - **Social links** – `PERSONAL_INFO.SOCIAL_LINKS` + `ContactSection` + `Footer`:
    - Each link has `icon: "gmail" | "linkedin" | ...`.
    - `ContactSection` uses a `switch (social.icon)` to choose a minified SVG.
    - `Footer` renders just text + arrow.

### 1.3 Prisma Schema & DB Support

Relevant fields:

- `SocialLink.icon: String?` — the icon key.
- `ToolboxCategory.items: Json` — documented as `[{ title: string, icon: string }]`.
- `PortfolioProject` JSON fields:
  - `technologies: Json?` — comment: `(string | { name: string; category?: string; icon?: string })[]`.
  - `links: Json?` — comment: `{ type: string; url: string; label: string; icon?: string }[]`.
  - `coverImage: Json?` — comment: `{ key?: string; src?: string; alt: string; priority?: boolean; ... }`.
  - `images: Json?` — comment: `{ key?: string; src?: string; alt: string; caption?: string }[]`.

**Conclusion:**

- The schema already has **string keys and flexible JSON** for icons and images.
- We do **not** need major Prisma changes for icons/images. We mainly need a clear **convention** and some helper utilities.

---

## 2. Design: Categories of Media

We’ll treat media in three categories:

1. **UI Icons (non‑editable)**
   - Small SVGs used for layout, interactions, decoration.
   - Owned entirely by the design system.
   - **Not editable** in the admin panel.

2. **Content Icons (key‑based)**
   - Icons representing technologies, social platforms, tools, etc.
   - Examples: tech logos in Toolbox, social network badges.
   - These are referenced by a **string key** from the database.

3. **Content Images (photos / mockups / covers)**
   - Project covers & gallery images.
   - Memoji, profile photo, etc.
   - These may be **seeded** from local assets but in the future should be
     **uploadable via the admin panel**.

---

## 3. Storage Strategy

### 3.1 UI Icons

- **Where**: Stay in `src/assets/icons/**` as local SVGs.
- **How**: Imported via SVGR as React components.
- **DB**: No database involvement.
- **Admin panel**: No editing.

This is already correct and performant. No changes needed.

### 3.2 Content Icons (Key‑based + Registry)

For icons that are part of the **content** (toolbox, social links, tech badges), we’ll:

1. **Store an icon key in the database**:
   - `SocialLink.icon` → e.g. `"gmail"`, `"linkedin"`, `"whatsapp"`.
   - `ToolboxCategory.items[].icon` in JSON → e.g. `"docker"`, `"tailwindcss"`.
   - `PortfolioProject.technologies[]` objects can optionally have `icon: string`.

2. **Resolve the key via a central registry in code**.

### 3.2.1 Icon Registry (Concept)

Create a central module (for example):

- `src/assets/icons/registry.ts`

This registry will:

- Define a **type‐safe set of keys** that the DB can store:
  - `type IconKey = 'gmail' | 'linkedin' | 'whatsapp' | 'js' | 'ts' | ...`.
- Map `IconKey` → a **renderable icon**:
  - Either an SVG React component (from SVGR) or a raster image (PNG/JPEG) for logos.
- Export helper functions used by UI components.

Examples of responsibilities (in prose, not code):

- `getIconComponent(key: IconKey)` – returns a React component/JSX for that icon.
- `ICON_OPTIONS` – array of `{ key, label }` used by the admin panel for dropdowns.

**Why this is good:**

- Single source of truth for what icon keys are allowed.
- DB stores **stable string keys**, not components.
- Admin panel can show a **select** of keys instead of dealing with React components.
- If you redesign icons later, you change the registry, not the DB.

### 3.2.2 How UI Uses the Registry

- **ToolboxRow**:
  - Today, it has a local `iconComponents` map.
  - Future: use `getIconComponent(item.icon)` from the registry.
  - If an icon key is unknown, fall back to `getCustomIcon(title, colors)` as it already does.

- **ContactSection**:
  - Today, a `switch (social.icon)` chooses which SVG to render.
  - Future: call `getIconComponent(social.icon)` instead of manual `switch`.
  - This will also work once `SocialLink` comes from the database instead of constants.

- **Tech badges / About section**:
  - Instead of hardcoding `<NextJSIcon />` in `About.tsx`, you can:
    - Store tech stack items in the DB (e.g. inside `Profile.techStack` JSON) with an `icon` key.
    - Render icons with the registry in `TechStackCard`.

### 3.2.3 Admin Panel for Icons

In admin forms:

- `SocialLink.icon` field:
  - Present a **select dropdown** backed by `ICON_OPTIONS` from the registry.
  - Optionally allow `null` or `"none"` for "no icon".

- `ToolboxCategory.items[].icon` field:
  - For each item, show a small icon + label list from `ICON_OPTIONS`.
  - Store only the `key` string in the JSON.

- This keeps the DB clean and lets you **add new icons by:
  - Adding SVG/PNG to `src/assets/icons/...`.
  - Adding an entry in `registry.ts`.
  - Redeploying.

For a personal portfolio, that’s a good trade‑off: 
- Icons are *mostly static*; updating icons via code is acceptable.

If you ever want **user‑uploaded icons**, you can extend the JSON shapes (see §4.2).

---

## 3.3 Content Images

For project covers, galleries, memoji, etc., there are two phases:

1. **Seeded static assets** (today).
2. **Uploaded images via the admin panel** (future).

### 3.3.1 Static Images (Today)

- Currently, images live under `src/assets/images/**` and are imported into TS.
- `projectImages` in `src/assets/images/index.ts` exports an object of imports.
- Components like `ProjectCard`, `ProjectModal`, and `ImageCarousel` use these imports with `next/image`.

This is fine for a code‑only portfolio. To work well with a DB and admin panel:

- We should treat these static imports as **initial seeds**.
- The database should ultimately store **a serializable description of the image**, not a TS import.

### 3.3.2 Future: Uploaded Images via Vercel Blob

Vercel’s template **“Photo Blog with Admin Panel”** uses:

- **Vercel Blob** for storing uploaded images.
- **Vercel Postgres** to store metadata + URLs.

For your portfolio, a similar pattern works well:

1. Use `@vercel/blob` to upload images from the admin panel (via server actions or API routes).
2. Store the returned **Blob URL** in your Postgres DB (inside the `coverImage`/`images` JSON for each `PortfolioProject`).
3. Configure `next.config.mjs` to allow Blob URLs for `next/image`:
   - Add `images.remotePatterns` for `https://*.blob.vercel-storage.com/*` (or the domain Vercel uses in your project).

Result:

- New project → admin uploads cover + gallery → Blob returns URL → stored in DB → UI renders `Image` using that URL.
- No need to redeploy for new media.

### 3.3.3 Recommended JSON Shape for Images

We can use a **unified shape** for project images that fits both static and Blob‑hosted sources.

Conceptual TS types (for documentation):

```ts
// Where the actual pixels live
export type ImageSource =
  | { type: "static"; path: string } // e.g. "/images/projects/team-docs-cover.png"
  | { type: "blob"; url: string };   // e.g. https://...blob.vercel-storage.com/...

// How it's stored in PortfolioProject.coverImage / images[]
export interface ProjectImageDto {
  src: ImageSource;
  alt: string;
  caption?: string;
  priority?: boolean;
}
```

In the database, `coverImage` and `images` (JSON) will hold these objects.

For example, a **seeded static cover image** could be stored as:

```jsonc
{
  "src": { "type": "static", "path": "/images/projects/team-docs-cover.png" },
  "alt": "Team‑Docs Collaborative Platform Interface",
  "priority": true
}
```

And a **Blob‑hosted image** would be:

```jsonc
{
  "src": {
    "type": "blob",
    "url": "https://<your-project>.blob.vercel-storage.com/team-docs/cover-abc123.png"
  },
  "alt": "Team‑Docs Collaborative Platform Interface"
}
```

Your React components (e.g. `ProjectCard`, `ProjectModal`, `ImageCarousel`) then:

1. Read `project.coverImage`/`project.images` from Prisma.
2. For each `ProjectImageDto`, derive the actual `src` string:
   - If `src.type === "static"`, use `src.path`.
   - If `src.type === "blob"`, use `src.url`.
3. Pass the string into `next/image`.

This keeps the DB flexible and lets you switch storage strategy later if needed.

---

## 4. Schema Considerations & Extensions

### 4.1 Do We Need to Change Prisma Schema?

Currently:

- `SocialLink.icon: String?` – good for icon keys.
- `ToolboxCategory.items: Json` – flexible enough for `{ title, icon }` and future extensions.
- `PortfolioProject.coverImage: Json?` & `images: Json?` – can hold the `ProjectImageDto` described above.
- `PortfolioProject.technologies: Json?` – comment already allows `{ name, category, icon }` objects.
- `PortfolioProject.links: Json?` – comment already allows `icon?: string`.

**Conclusion:**

- You **do not need a migration** just to support icons/images.
- The existing JSON fields are flexible enough for the proposed shapes.

If you prefer, you can **tighten docs** to specify the expected JSON shapes (as done above), and let TypeScript enforce it on the app side.

### 4.2 Optional Future: MediaAsset Table

If the portfolio grows or you want analytics / reuse, you could add a dedicated table:

```prisma
model MediaAsset {
  id        String   @id @default(cuid())
  profileId String

  kind      String   // "icon" | "image" | ...
  key       String?  // stable slug (e.g. "team-docs-cover")
  url       String   // Blob URL or CDN path
  alt       String?

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  profile Profile @relation(fields: [profileId], references: [id], onDelete: Cascade)

  @@index([profileId])
}
```

Then `PortfolioProject.coverImage` / `images` could store references like `{ mediaId: string }` instead of full URLs. This is **not necessary** right now, but the existing JSON approach won’t block you from introducing it later.

---

## 5. Admin Panel – Step‑by‑Step Integration

### 5.1 Icons in Admin UI

1. **Expose Icon Options**
   - In `registry.ts`, export `ICON_OPTIONS: { key: IconKey; label: string; category?: string }[]`.
   - Optionally group by category (e.g. `"social"`, `"frontend"`, `"backend"`).

2. **Social Links Form**
   - Fields: `label`, `url`, `icon (IconKey)`, `kind`, `isPrimary`, `isPublic`, `sortOrder`.
   - `icon` is a `<select>` bound to `ICON_OPTIONS`.
   - Save `icon` directly into `SocialLink.icon`.

3. **Toolbox Categories Form**
   - `ToolboxCategory` edit screen loads `items` JSON.
   - Render items in a list with `{ title, iconKey }`.
   - `iconKey` is chosen from `ICON_OPTIONS`.
   - On save, serialize back into JSON: `[{ "title": "Next.js", "icon": "nextjs" }, ...]`.

4. **Project Technologies Form (optional enhancement)**
   - For each technology, allow:
     - `name` (string), `category` (optional), `icon` (IconKey).
   - Store as JSON objects in `PortfolioProject.technologies`.
   - `TechBadges` can be extended to show icons when `icon` is present.

### 5.2 Images in Admin UI

1. **Configure Vercel Blob**
   - Add `@vercel/blob` to dependencies.
   - Create a server action or API route that accepts a file (cover/gallery upload), calls `put()` from `@vercel/blob`, and returns `{ url }`.
   - Add `remotePatterns` to `next.config.mjs.images` so `next/image` can optimize Blob URLs.

2. **Project Form – Cover Image**
   - Show current cover preview using `coverImage.src`.
   - Allow two options:
     - **Use existing static image**: choose from a list of predefined paths (seeded images).
     - **Upload new image**: send to Blob, get URL, store as `src: { type: "blob", url }`.

3. **Project Form – Gallery**
   - Same pattern as cover:
     - List of `ProjectImageDto` objects.
     - Each entry can be static or Blob‑hosted.
     - Allow adding/removing images.

4. **Other Sections (optional)**
   - If you move profile/memoji images into DB, reuse the same `ImageSource` shape and Blob upload flow.

---

## 6. Migration Plan from Current Codebase

This is a suggested order for implementation.

### Step 1 – Finalize JSON Shapes in Code (Types Only)

- Define TS types for:
  - `IconKey` and `IconDescriptor` (for registry).
  - `ImageSource` and `ProjectImageDto`.
- Use these in your front‑end code (components + data mappers) without changing Prisma.

### Step 2 – Introduce Icon Registry

- Create `src/assets/icons/registry.ts`.
- Move `iconComponents` mapping from `ToolboxRow` into the registry.
- Add social icons and any other content icons.
- Replace:
  - The `switch (social.icon)` in `ContactSection` with `getIconComponent(social.icon)`.
  - Direct references to `iconComponents` in `ToolboxRow` with registry calls.

### Step 3 – Align DB/Constants Icon Keys

- Ensure values like `PERSONAL_INFO.SOCIAL_LINKS[i].icon` and `toolboxCategories[*].items[*].icon` use keys defined in `IconKey`.
- When you migrate to loading these from Prisma, the same keys will work.

### Step 4 – Prepare for Blob Images

- Add Blob remote patterns to `next.config.mjs.images`.
- Refactor `ProjectCard`, `ProjectModal`, `ImageCarousel` to accept `ProjectImageDto` from Prisma instead of direct imports.
  - For now, your seeding script can generate JSON using `type: "static"` and `path` values like `"/images/projects/..."`.

### Step 5 – Build Admin Forms

- Implement admin pages for:
  - `SocialLink` with icon select.
  - `ToolboxCategory` with JSON items editing.
  - `PortfolioProject` with cover + gallery upload via Blob.
- Use the registry + types defined above to keep everything consistent.

---

## 7. Evaluation of Current Icon Implementation

**What’s good now:**

- Local SVGs with SVGR and SVGO – great for performance and control.
- Clear visual design for toolbox and hero icons.
- Prisma schema is already flexible enough for icon keys and image metadata.

**Main issues to address:**

- Icon logic is **scattered**:
  - Toolbox has its own map; Contact uses a `switch`; About hardcodes icons directly.
- No **single registry** for which icon keys exist and how they map to assets.
- DB fields (`icon` string, JSON) are not yet tied to a clear icon registry contract.

**How the proposed approach fixes it:**

- **Central registry + key‑based icons** make the system predictable and admin‑friendly.
- **JSON image shapes** with `ImageSource` allow mixing static assets and Blob uploads without changing Prisma.
- Vercel Blob is used only for **truly dynamic media**, while UI icons remain static and optimized.

This gives you a clean path to a DB‑backed, admin‑editable portfolio without losing the control and performance of your current icon setup.
