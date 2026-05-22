# Firestore Collections

This app expects three optional Cloud Firestore collections.

## `comments`

Guestbook entries created by the terminal `git commit` command.

```json
{
  "username": "Guest",
  "message": "Great portfolio",
  "hash": "abc1234",
  "prefix": "feat",
  "created_at": "serverTimestamp()"
}
```

## `blog_posts`

Markdown posts displayed in the editor and sidebar.

```json
{
  "slug": "vibecoding-portfolio",
  "title": "Vibecoding this Portfolio",
  "content": "# Vibecoding this Portfolio\n\n...",
  "created_at": "serverTimestamp()"
}
```

## `skills`

Optional replacement for environment-driven skills. `level` may be stored as
either `0.9` or `90`; the app normalizes values above `1` to percentages.

```json
{
  "name": "TypeScript",
  "level": 0.95,
  "status": "Stable",
  "memory_usage": "Low"
}
```

## Security Rules

The Firebase Web SDK uses public client configuration, so protect these
collections with Firestore Security Rules. A typical portfolio setup allows
public reads for `comments`, `blog_posts`, and `skills`, allows public comment
creation, and restricts blog/skill writes to an authenticated admin workflow.

## Seeding

The repo includes an Admin SDK seed script so initial Firestore documents can be
created without relaxing public rules:

```bash
GOOGLE_APPLICATION_CREDENTIALS=./service-account.json npm run firebase:seed
```

Create the service account JSON in Firebase Console under Project settings,
Service accounts, Generate new private key. Do not commit that JSON file.
