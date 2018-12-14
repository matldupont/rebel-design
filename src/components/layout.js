import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components';

import Header from './header'
import Sidebar from './Side'

import { GlobalStyle } from '../utilities/styles'

const LayoutWrapper = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
`;

const MainPanel = styled.div``;

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <GlobalStyle key="globals" />
        <LayoutWrapper>
          <Sidebar />
          <MainPanel>
            <Header siteTitle={data.site.siteMetadata.title} />
            {children}
          </MainPanel>
        </LayoutWrapper>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
