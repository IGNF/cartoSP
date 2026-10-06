import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    server: {
      deps: {
        // ol-contextmenu imports "ol/..." without file extensions
        inline: [/ol-contextmenu/, /geopf-extensions-openlayers/],
      },
    },
  },
});
