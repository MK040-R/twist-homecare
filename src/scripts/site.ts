// The only JavaScript the site ships. Each part is small and works on plain HTML rendered at build time.
import { captureAttribution } from './attribution';
import { initAccordions } from './accordion';
import { initTabs } from './tabs';
import { initCarousels } from './carousel';
import { initNotify } from './notify';

captureAttribution();
initAccordions();
initTabs();
initCarousels();
initNotify();
