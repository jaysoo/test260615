# Turborepo + Next.js + Shared Remote Cache

bump: 1

Minimal Turborepo monorepo:

```
apps/web        Next.js 15 app (App Router)
packages/ui     shared React component package (@repo/ui)
```

Remote cache shared across `main` and all branches in CI via a single key in
GitHub secrets.

## Local dev

```bash
pnpm install
pnpm dev          # next dev on http://localhost:3000
pnpm build        # turbo build (caches output)
```

## Remote cache setup

Turborepo's remote cache is content-addressed: the cache key is a hash of each
task's inputs (source, deps, config), **not** the git branch. So once `main`
populates the cache, a branch with identical inputs gets a cache HIT, and vice
versa. Sharing one token/team is all that's needed for cross-branch reuse.

### Option A — Vercel Remote Cache (easiest)

1. Run once locally to link the repo:

   ```bash
   npx turbo login
   npx turbo link
   ```

2. Grab a token: Vercel dashboard -> Account Settings -> Tokens, create one.

3. Add to GitHub repo:
   - **Secret** `TURBO_TOKEN` = the token (Settings -> Secrets and variables -> Actions -> Secrets)
   - **Variable** `TURBO_TEAM` = your Vercel team slug (Settings -> Secrets and variables -> Actions -> Variables)

That's the "shared key". Every workflow run (main or branch) uses the same
`TURBO_TOKEN` + `TURBO_TEAM`, so all runs hit the same cache.

### Option B — Self-hosted cache server

Run any Turbo-cache-compatible server (e.g. `ducktors/turborepo-remote-cache`),
then in CI set:

```yaml
env:
  TURBO_API: ${{ vars.TURBO_API }}     # https://your-cache-server
  TURBO_TOKEN: ${{ secrets.TURBO_TOKEN }}
  TURBO_TEAM: ${{ vars.TURBO_TEAM }}    # any stable team name
```

Same idea: one token/team = one shared cache for all branches.

## How the CI shares the cache

See `.github/workflows/ci.yml`. Key points:

- `TURBO_TOKEN` / `TURBO_TEAM` set at the workflow `env` level -> available on
  every branch and on `main`.
- `TURBO_REMOTE_ONLY: true` -> CI never relies on a local `.turbo` dir, so the
  remote cache is the single source of truth.
- Trigger on both `push` to `main` and `pull_request` -> branches and main both
  read/write the same cache.

## Verify a cache hit

1. Push to a branch, let CI build (populates cache).
2. Open a PR / push another branch with the same inputs.
3. In the build log you'll see `cache hit, replaying logs` and `>>> FULL TURBO`.
