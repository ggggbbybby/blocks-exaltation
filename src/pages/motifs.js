import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import Motif from '../components/motif'
import SEO from '../components/seo'

const MotifsPage = ({ count = 4 }) => (
  <Layout>
    <SEO title="Motifs" keywords={[`gatsby`, `application`, `react`]} />
    <nav>
        <Link to="/blocks/">See some blocks</Link>
    </nav>
    <p>Remember: all designs are beautiful unless proven otherwise.</p>

    <div style={{marginBottom: `1.45rem` }}>
      <Motif />
    </div>
  </Layout>
)

export default MotifsPage