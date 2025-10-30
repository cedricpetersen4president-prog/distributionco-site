import EleventyVitePlugin from "@11ty/eleventy-plugin-vite";
import tailwindcss from "@tailwindcss/vite";
import browserslist from "browserslist";
import { browserslistToTargets } from "lightningcss";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default async function (eleventyConfig) {
  eleventyConfig.setInputDirectory("src");
  eleventyConfig.setLayoutsDirectory("_layouts");
  eleventyConfig.setOutputDirectory("dist");
  eleventyConfig.setTemplateFormats("njk,js,css");
  eleventyConfig.watchIgnores.add("README.md");

  eleventyConfig.addPlugin(EleventyVitePlugin, {
    viteOptions: {
      plugins: [tailwindcss()],
      showVersion: true,
      appType: "custom",
      server: {
        clearScreen: true,
        mode: "development",
        origin: "http://localhost:8080",
      },
      resolve: {
        alias: {
          "/node_modules/": path.resolve(__dirname, "node_modules/"),
          "@": path.resolve(__dirname, "src/"),
        },
      },
      css: {
        transformer: "lightningcss",
        lightningcss: {
          targets: browserslistToTargets(browserslist()),
          sourcemap: true,
        },
        devSourcemap: true,
      },
      build: {
        cssMinify: "lightningcss",
        mode: "production",
        emptyOutDir: true,
        sourcemap: true,
      },
    },
  });
}
