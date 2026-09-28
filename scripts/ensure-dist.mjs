// `wrangler dev` needs the assets folder to exist, even before the first build.
import { mkdirSync } from 'node:fs';
mkdirSync(new URL('../dist', import.meta.url), { recursive: true });
