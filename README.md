# The Daffodil Group

## Local Development

- `npm run dev` starts the normal Next.js dev server.
- `npm run dev:clean` removes the local `.next` cache first, then starts dev.
- `npm run clean` removes the generated `.next` folder.
- `npm run build:clean` runs a fully clean production build.

## When Hot Reload Gets Out Of Sync

If you see errors like `Cannot find module './682.js'` or missing `/_next/static/...` files:

1. Stop the current dev server.
2. Run `npm run dev:clean`.
3. Hard refresh the browser once the server is back.

These errors usually come from stale dev chunks in `.next` after a crash, runtime error, branch switch, or interrupted Fast Refresh cycle.
