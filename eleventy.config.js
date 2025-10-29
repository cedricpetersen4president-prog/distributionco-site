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
  eleventyConfig.setTemplateFormats("njk");
  eleventyConfig.watchIgnores.add("README.md");

  // eleventyConfig.addPassthroughCopy("src/css/style.css");
  eleventyConfig.addPassthroughCopy("src/js/*.js");

  eleventyConfig.addPlugin(EleventyVitePlugin, {
    viteOptions: {
      server: {
        clearScreen: true,
        watch: { usePolling: true },
      },
      resolve: {
        alias: { "@": "/src" },
        "/node_modules": path.resolve(__dirname, "node_modules"),
      },
      css: {
        transformer: "lightningcss",
        lightningcssOptions: {
          targets: browserslistToTargets(browserslist("> 0.25%, not dead")),
        },
        postcss: {
          plugins: [tailwindcss()],
        },
      },
      build: {
        mode: "production",
        cssMinify: "lightningcss",
      },
    },
  });
}
