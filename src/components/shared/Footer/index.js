import React from "react"
import css from "./index.module.css"
import { useStaticQuery, graphql } from "gatsby"
import "@fontsource/permanent-marker"

const Footer = ({ style }) => {
  const query = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          author
        }
      }
    }
  `)

  return (
    <div className={css.container} style={style}>
      <div className={css.subContainer}>
        <p>
          Made with <span className={css.tech}>React</span> and{" "}
          <span className={css.tech}>Gatsby</span> by{" "}
          <a
            href="https://github.com/Redskinsjo?tab=repositories"
            className={css.myProfile}
          >
            {query.site.siteMetadata.author}
          </a>
        </p>
        <span>
          Use of{" "}
          <a href="https://trefle.io/" className={css.api}>
            a free API
          </a>
        </span>
      </div>
    </div>
  )
}

export default Footer
