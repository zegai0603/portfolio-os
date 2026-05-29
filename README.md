# Portfolio Terminal

A VS Code-inspired portfolio with working terminal :)

## Quick Start

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Edit .env with your personal info

# Start development server
npm run dev
```

## Configuration

All personal data is configured via environment variables in `.env`:

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_NAME` | Your full name |
| `NEXT_PUBLIC_TITLE` | Your job title |
| `NEXT_PUBLIC_EMAIL` | Contact email |
| `NEXT_PUBLIC_GITHUB` | GitHub profile URL |
| `NEXT_PUBLIC_GITHUB_USERNAME` | GitHub username (for project fetching) |
| `GITHUB_TOKEN` | Server-only GitHub token for private/collaborator repo fetching |
| `GITHUB_REPO_ALLOWLIST` | Optional comma-separated repo allowlist, e.g. `owner/repo,other-repo` |
| `NEXT_PUBLIC_LANGUAGES` | Comma-separated skills list |
| `NEXT_PUBLIC_SKILLS_DATA` | JSON array of skills with levels |

For private collaborator repositories that require a classic token, keep the token
server-side and pair it with an allowlist:

```env
GITHUB_TOKEN=ghp_your_classic_token
GITHUB_REPO_ALLOWLIST=owner/private-repo,yourname/public-repo
```

## Terminal Commands

| Command | Description |
|---------|-------------|
| `help` | Show available commands |
| `cd <dir>` | Change directory (e.g., `cd frontend`) |
| `ls` | List current directory contents |
| `pwd` | Print working directory |
| `npm run dev` | Launch frontend preview (in `/frontend`) |
| `git commit -m "msg" --author "authorname"` | Add a comment to the guestbook |
| `whoami` | Display developer info |
| `skills` | Show skill summary |
| `contact` | Display contact info |
| `clear` | Clear terminal |

## Frontend Preview

Navigate to the frontend folder and run the dev server:

```bash
cd frontend
npm run dev
```

This opens an interactive portfolio preview with Home, Projects, Skills, and Contact pages.

## Project Structure

```
src/
├── portfolio/
│   ├── intro.py      # Home page (Python-style)
│   ├── projects.json # Projects (fetched from GitHub)
│   ├── skills.ts     # Skills display
│   └── contact.md    # Contact info
├── blog/             # Blog posts
└── frontend/         # Preview app source files
```

## Optional: Firebase Integration

For guestbook comments, configure:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your-measurement-id
```

Create Firestore collections for `comments`, `blog_posts`, and optionally `skills`.
See `resources/firestore_schema.md` for expected fields.

## Keyboard Shortcuts

- `Ctrl+`` ` - Toggle terminal
- `Ctrl+P` - Command palette
- `Ctrl+B` - Toggle sidebar

---

Built with Next.js + TypeScript. Inspired by VS Code.
