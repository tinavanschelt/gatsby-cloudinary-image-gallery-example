# Gatsby Cloudinary Image Gallery Example

This gatsby-starter-blog implementation is used to demonstrate possible ways of using [https://github.com/tinavanschelt/gatsby-source-google-photos](gatsby-source-google-photos) and [https://github.com/tinavanschelt/gatsby-google-photos-gallery](gatsby-google-photos-gallery).

## Overview of modifications made to gatsby-starter-blog

### Install packages

Firstly, add the necessary packages to your gatsby project

```
npm i --save gatsby-plugin-cloudinary-image-gallery
```

If you plan on using the component inside your markdown files / posts add the `rehype-react` and `gatsby-component-remark`

```
npm i --save rehype-react gatsby-component-remark
```

### Setup gatsby-plugin-cloudinary-image-gallery

### Create a StaticQuery component

Then create a component that wraps your PhotoGrid component in a Static Query, I called it gallery.js

```javascript
import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"

import ImageGallery from "gatsby-plugin-cloudinary-image-gallery"

const Gallery = ({ folder, columns, orientation }) => (
  <StaticQuery
    query={imageGalleryQuery}
    render={data => (
      <ImageGallery
        folder={folder}
        columns={columns}
        data={data}
        orientation={orientation}
      />
    )}
  />
)

const imageGalleryQuery = graphql`
  query galleryQuery {
    cloudinaryImage: allCloudinaryImage {
      edges {
        node {
          id
          folder
          thumb
          imgUrl
          width
          height
          orientation
        }
      }
    }
    site {
      siteMetadata {
        author
        social {
          twitter
        }
      }
    }
  }
`

Gallery.propTypes = {
  folder: PropTypes.string.isRequired,
}

export default Gallery
```

You can now use the component in your other components.

## Markdown usage

### Update /templates/blog-post.js

1. Register your component using rehype-react (see [https://using-remark.gatsbyjs.org/custom-components/](https://using-remark.gatsbyjs.org/custom-components/))

```
import rehypeReact from "rehype-react"
import Gallery from "../components/gallery"

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: { "photo-gallery": Gallery },
}).Compiler
```

2. Replace

```
<div dangerouslySetInnerHTML={{ __html: post.html }} />
```

with

```
{ renderAst(post.htmlAst) }
```

3. Change `html` to `htmlAst` in your pageQuery

### Setup gatsby-component-remark

Update your gatsby-config with

```
{
  resolve: `gatsby-transformer-remark`,
  options: {
    plugins: [
      ...
      `gatsby-remark-component`,
    ],
  },
}
```

### Add the component to your markdown file:

```
<photo-gallery album="gatsby"></photo-gallery>
```

Visit [gatsby-plugin-cloudinary-image-gallery](https://github.com/tinavanschelt/gatsby-plugin-cloudinary-image-gallery) for details on how you can customise the component.
