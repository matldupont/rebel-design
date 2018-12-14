import React from 'react'

import Layout from '../components/layout'
import Image from '../components/image'
import SEO from '../components/seo'

import ComponentLibrary from '../components/ComponentLibrary';

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={['rebel', 'design system', 'react', 'pattern library', 'components']} />
    <ComponentLibrary />
  </Layout>
)

export default IndexPage
