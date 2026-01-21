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
| `NEXT_PUBLIC_LANGUAGES` | Comma-separated skills list |
| `NEXT_PUBLIC_SKILLS_DATA` | JSON array of skills with levels |

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

## Optional: Supabase Integration

For guestbook comments, configure:

```env
NEXT_PUBLIC_SUPABASE_URL=your-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key
```

Create a `comments` table with: `id`, `message`, `author`, `created_at`.

## Keyboard Shortcuts

- `Ctrl+`` ` - Toggle terminal
- `Ctrl+K` - Command palette
- `Ctrl+B` - Toggle sidebar

---

Built with Next.js + TypeScript. Inspired by VS Code.
