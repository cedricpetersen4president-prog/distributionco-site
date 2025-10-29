import EleventyVitePlugin from "@11ty/eleventy-plugin-vite";
import browserslist from "browserslist";
import { browserslistToTargets } from "lightningcss";
import tailwindcss from "tailwindcss";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default async function (eleventyConfig) {
  eleventyConfig.setInputDirectory("src");
  eleventyConfig.setLayoutsDirectory("_layouts");
  eleventyConfig.setOutputDirectory("dist");
  eleventyConfig.setTemplateFormats("njk,css,js");
  eleventyConfig.watchIgnores.add("README.md");

  // eleventyConfig.addPassthroughCopy("src/assets/css/*.css");
  // eleventyConfig.addPassthroughCopy("src/assets/js/*.js");

  eleventyConfig.addPlugin(EleventyVitePlugin, {
    viteOptions: {
      plugins: [tailwindcss()],
      watch: ["src/**/*"],
      showVersion: true,
      server: {
        clearScreen: true,
        mode: "development",
        origin: "http://localhost:8080",
      },
      resolve: {
        alias: {
          "@": path.resolve(__dirname, "node_modules"),
        },
      },
      css: {
        transformer: "lightningcss",
        lightningcssOptions: {
          targets: browserslistToTargets(browserslist("> 0.25%, not dead")),
        },
      },
      build: {
        mode: "production",
        cssMinify: "lightningcss",
        sourceMap: true,
        emptyOutDir: true,
      },
    },
  });
}
