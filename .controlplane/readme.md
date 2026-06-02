# Control Plane Deployment Notes

This repo now includes `cpflow` scaffolding for:

- opt-in PR review apps
- automatic staging deploys from `main`
- manual promotion from staging to production

## Why This Shape

This app ships a production-ready Dockerfile at the repository root and stores
its production SQLite, Solid Cache, Solid Queue, and Solid Cable databases under
`/rails/storage`.

The Control Plane setup mirrors that:

- `.controlplane/controlplane.yml` points `dockerfile: ../Dockerfile`
- `templates/storage.yml` creates a persistent volume for `/rails/storage`
- `templates/rails.yml` runs the public `rails` workload on port `80`
- `release_script.sh` runs `bin/rails db:prepare` before deploys switch images

The root `Dockerfile` now installs Node.js in both the build and runtime stages,
compiles the auto-generated React on Rails packs plus `server-bundle.js`, and
keeps Node available for ExecJS-based SSR at runtime.

## Required Runtime Secrets

Before the app will boot on Control Plane, populate `SECRET_KEY_BASE` in the
generated secret dictionaries:

- `react-on-rails-demo-v16-ssr-staging-secrets`
- `react-on-rails-demo-v16-ssr-review-secrets`
- `react-on-rails-demo-v16-ssr-production-secrets`

`cpflow setup-app` creates those dictionaries automatically. You only need to
add a `SECRET_KEY_BASE` entry to each one before the first deploy.

Review apps run pull request code. Values mounted through `cpln://secret/...`
can be read by that code after the workload starts, so keep the review secret
dictionary limited to generated, review-only values. Do not reuse production or
long-lived staging secret dictionaries for review apps.

## Local cpflow Flow

Typical setup:

```sh
export APP_NAME=react-on-rails-demo-v16-ssr-staging

cpflow setup-app -a "$APP_NAME"
cpflow build-image -a "$APP_NAME"
cpflow deploy-image -a "$APP_NAME" --run-release-phase
cpflow open -a "$APP_NAME"
```

## GitHub Actions Variables And Secrets

Set these in GitHub before enabling the generated `cpflow-*` workflows:

- `CPLN_TOKEN_STAGING`
- `CPLN_TOKEN_PRODUCTION`
- `CPLN_ORG_STAGING`
- `CPLN_ORG_PRODUCTION`
- `STAGING_APP_NAME=react-on-rails-demo-v16-ssr-staging`
- `PRODUCTION_APP_NAME=react-on-rails-demo-v16-ssr-production`
- `REVIEW_APP_PREFIX=react-on-rails-demo-v16-ssr-review`

Optional:

- `STAGING_APP_BRANCH=main`
- `PRIMARY_WORKLOAD=rails`

Use a staging/review `CPLN_TOKEN_STAGING` that cannot access production Control
Plane resources. In public repositories, review-app deploys skip fork PR heads
because Docker builds use repository secrets. If a forked change needs a review
app, first move the reviewed change to a trusted branch in this repository.
