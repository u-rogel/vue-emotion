import Vue from 'vue'
import { classResolver } from '../utils/class-resolver'

export const funcGen = (htmlTag, stylesTemplates, propTypes = {}) => Vue.component(
  'StyledComponent',
  {
    functional: true,
    props: {
      className: String,
      ...propTypes,
    },
    render(createElement, context) {
      const {
        parent,
        children,
        data,
        props,
      } = context
      return createElement(
        htmlTag,
        {
          ...data,
          class: (() => {
            const theme = parent.$veTheme
            const resolvedClasses = classResolver({
              theme,
              stylesTemplates,
              props,
              staticClass: data.staticClass,
            })
            data.staticClass = ''
            return resolvedClasses
          })(),
          on: {
            ...data.on,
          },
          attrs: {
            ...data.attrs,
          },
        },
        children,
      )
    },
    styledComponent: {
      functional: true,
      stylesTemplates,
      htmlTag,
      propTypes,
    },
  },
)

export const styledFunc = (
  htmlTag,
  stylesTemplate,
) => (propTypes) => funcGen(
  htmlTag,
  [stylesTemplate],
  propTypes,
)
