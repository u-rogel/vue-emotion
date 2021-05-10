import Vue from 'vue'
import { classResolver } from '../utils/class-resolver'

export const compGen = (htmlTag, stylesTemplates, props = {}) => Vue.component(
  'StyledComponent',
  {
    props: {
      className: String,
      value: [String, Number, Date, Boolean],
      ...props,
    },
    computed: {
      localValue: {
        get() { return this.value },
        set(newVal) { this.$emit('input', newVal) },
      },
    },
    render(createElement) {
      return createElement(
        htmlTag,
        {
          class: (() => {
            const theme = this.$veTheme
            const resolvedClasses = classResolver({
              theme,
              stylesTemplates,
              props: this.$props,
              staticClass: this.$vnode.data,
            })
            this.$vnode.data.staticClass = ''
            return resolvedClasses
          })(),
          on: {
            ...this.$listeners,
            input: (newVal) => { this.localValue = newVal.target.value },
          },
          domProps: {
            value: this.localValue,
          },
        },
        this.$slots?.default,
      )
    },
    styledComponent: {
      stylesTemplates,
      htmlTag,
      props,
    },
  },
)

export const styledComp = (
  htmlTag,
  stylesTemplate,
) => (props) => compGen(
  htmlTag,
  [stylesTemplate],
  props,
)
