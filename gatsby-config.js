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
      resolve: "gatsby-plugin-google-fonts",
      options: {
        fonts: ["Permanent Marker", "Catamaran"],
      },
    },
    `gatsby-plugin-fontawesome-css`,
  ],
}
