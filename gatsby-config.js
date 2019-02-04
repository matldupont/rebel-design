module.exports = {
  siteMetadata: {
    title: 'Rebel Design Language',
    description: 'Rebel.com - Design Language and Pattern Library',
    author: 'Mat Dupont - Rebel.com',
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-react-svg',
    },
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {
        "fileName": false,
      },
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'Rebel Design Language',
        short_name: 'RebelDesign',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/images/pin.png', // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-offline',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'Rebel Design Language',
        short_name: 'RebelDesign',
        start_url: '/',
        background_color: '#333',
        theme_color: '#333',
        display: 'minimal-ui',
        icon: 'src/images/pin.png', // This path is relative to the root of the site.
      },
    },
  ],
}
