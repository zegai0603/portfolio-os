# zhekhai.com

Next.js site. All content is in `src/lib/profile.ts`, and blog posts are Markdown files in `src/content/blog/`.

```bash
npm install
npm run dev
```

- Add a project: add an item to `items` in `src/lib/profile.ts`. Its position on the plot and its ring on the dial come from its dates. New projects may need adding to `LOWER_ROW` or `LABEL_BELOW` in `src/components/Plot.tsx` if labels collide.
- Add images: put them in `public/` and list them under the item's `images`. A project without images shows no image row.
- Add a post: add `src/content/blog/<slug>.md` and an item with `lane: "blogs"` linking to `/blog/<slug>`.
- Keep `axis.to` in `src/lib/profile.ts` current, because "present" items run up to it.

Pushes to `main` deploy to Vercel.
