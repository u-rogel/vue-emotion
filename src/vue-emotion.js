import Vue from 'vue'
import {
  css,
} from '@emotion/css'

import domElements from './dom-elements'

const compGen = (htmlTag, stylesTemplates, props = {}) => {
  return Vue.component(
    'StyledComponent',
    {
      props: {
        className: String,
        ...props,
      },
      render(createElement) {
        return createElement(
          htmlTag,
          {
            class: (() => {
              const theme = this.$veTheme
              const classes = stylesTemplates.map((stylesTemplate) => {
                const [strings, tags = []] = stylesTemplate
                let flatTags = []
                if (tags.length) {
                  flatTags = tags.map((item) => {
                    if (typeof item === 'function') {
                      return item(this.$props, theme)
                    }
                    return item
                  })
                }

                return css(strings, ...flatTags)
              })
              
              const { staticClass } = this.$vnode.data
              const genClass = `${classes.join(' ')}${staticClass ? ` ${staticClass}` : ''}`
              this.$vnode.data.staticClass = ''
              return genClass
            })(),
            on: {
              ...this.$listeners,
            },
          },
          this.$slots && this.$slots.default,
        )
      },
      styledComponent: {
        stylesTemplates,
        htmlTag,
        props,
      },
    },
  )
}

const styledFunc = (
  htmlTag,
  stylesTemplate
) => (props) => compGen(
  htmlTag,
  [stylesTemplate],
  props
)

const styled = (styledComp) => {
  const {
    htmlTag,
    stylesTemplates: formerStyles,
    props: formerProps
  } = styledComp.extendOptions.styledComponent
  return (strings, ...tags) => {
    return (props) => compGen(htmlTag, [...formerStyles, [strings, tags]], { ...formerProps, ...props})
  }
}

domElements.forEach((elem) => {
  styled[elem] = (strings, ...tags) => styledFunc(elem, [strings, tags])
})

export default styled
