import { css } from '@emotion/css'

export const classResolver = ({
  theme,
  stylesTemplates,
  props,
  staticClass,
}) => {
  const classes = stylesTemplates.map((stylesTemplate) => {
    const [strings, tags] = stylesTemplate
    let flatTags = []
    if (tags?.length) {
      flatTags = tags.map((item) => {
        if (typeof item === 'function') {
          return item(props, theme)
        }
        return item
      })
    }

    return css(strings, ...flatTags)
  })

  const genClass = `${classes.join(' ')}${staticClass ? ` ${staticClass}` : ''}`
  return genClass
}
