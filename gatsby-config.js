/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  siteMetadata: {
    title: `Trefle API`,
    description: `Site vitrine de découverte des plantes`,
    author: `Jonathan Carnos`,
  },
  plugins: [
    {
      resolve: "gatsby-plugin-prefetch-google-fonts",
      options: {
        fonts: [
          { family: "Permanent Marker", display: "swap" },
          {
            family: "Catamaran",
            variants: ["200", "462", "700"],
            display: "swap",
          },
        ],
      },
    },
    `gatsby-plugin-fontawesome-css`,
  ],
}
