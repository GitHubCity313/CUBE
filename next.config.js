const withFonts = require("next-fonts");

module.exports = withFonts({
  reactStrictMode: true,
  publicRuntimeConfig: {
    baseUrl:
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000" // development api
        : "http://localhost:3000", // production api - changer une fois l'url connue
    apiUrl:
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/api" // development api
        : "http://localhost:3000/api", // production api - changer une fois l'url connue
  },
  webpack: (config) => {
    // Important: return the modified config
    return config;
  },
  images: {
    domains: ["mathieu-neveu.com"],
  },
});
