import { setProjectAnnotations } from '@storybook/nextjs';

import * as previewAnnotations from './.storybook/preview';

const annotations = setProjectAnnotations([
  previewAnnotations,
  // addonAnnotations
]);

// Run Storybook's beforeAll hook
beforeAll(annotations.beforeAll);
