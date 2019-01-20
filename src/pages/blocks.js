import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import Blocks from '../components/blocks'
import SEO from '../components/seo'

const BlocksPage = ({ count = 4 }) => (
  <Layout>
    <SEO title="Blocks" keywords={[`gatsby`, `application`, `react`]} />
    <nav>
      <Link to="/motifs/">See some Motifs</Link>
    </nav>
    <p>Remember: all designs are beautiful unless proven otherwise.</p>

    <div style={{marginBottom: `1.45rem` }}>
      <Blocks count={count} />
    </div>
  </Layout>
)

export default BlocksPage
