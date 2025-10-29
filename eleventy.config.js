import EleventyVitePlugin from "@11ty/eleventy-plugin-vite";
export default async function (eleventyConfig) {
  eleventyConfig.setInputDirectory("src");
  eleventyConfig.setLayoutsDirectory("_layouts");
  eleventyConfig.setOutputDirectory("dist");
  eleventyConfig.setTemplateFormats("html,liquid,njk");
  eleventyConfig.watchIgnores.add("README.md");
  eleventyConfig.addPassthroughCopy("src/style.css");
  eleventyConfig.addPlugin(EleventyVitePlugin);
}
