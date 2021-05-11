import Vue from 'vue'
import { classResolver } from '../utils/class-resolver'

export const funcGen = (htmlTag, stylesTemplates, props = {}) => Vue.component(
  'StyledComponent',
  {
    functional: true,
    props: {
      className: String,
      ...props,
    },
    render(createElement, context) {
      const {
        parent,
        children,
        data,
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
      props,
    },
  },
)

export const styledFunc = (
  htmlTag,
  stylesTemplate,
) => (props) => funcGen(
  htmlTag,
  [stylesTemplate],
  props,
)
