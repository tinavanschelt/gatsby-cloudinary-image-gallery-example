import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Gallery from "../components/gallery"
import { rhythm } from "../utils/typography"

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title="All posts"
          keywords={[`blog`, `gatsby`, `javascript`, `react`]}
        />
        <Bio />
        <p>
          This gatsby-starter-blog implementation is used to demonstrate
          possible ways of using{" "}
          <a
            href="https://github.com/tinavanschelt/gatsby-source-google-photos"
            target="_blank"
          >
            gatsby-source-google-photos
          </a>{" "}
          with{" "}
          <a
            href="https://github.com/tinavanschelt/gatsby-google-photos-gallery"
            target="_blank"
          >
            gatsby-google-photos-gallery
          </a>
          . A repo of this site, including an overview of how the starter-blog
          was modified, is available on{" "}
          <a
            href="https://github.com/tinavanschelt/gatsby-google-photos-gallery-example"
            target="_blank"
          >
            github
          </a>
          .
        </p>
        <Gallery album="gatsby" columns="2" />
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <div key={node.fields.slug}>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                  {title}
                </Link>
              </h3>
              <small>{node.frontmatter.date}</small>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.excerpt,
                }}
              />
            </div>
          )
        })}
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
          }
        }
      }
    }
  }
`