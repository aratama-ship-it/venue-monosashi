# Sites deployment

The deployable application lives in `web/`. Build and package that directory;
the repository-root `dist/` is not the current Venue Monosashi application.

Before publishing, run `npm run validate` from the repository root. The Sites
archive must be created from `web/dist/` with `web/.openai/hosting.json`.
