import { compGen, styledComp } from './constructors/components'
import { funcGen, styledFunc } from './constructors/functionals'
import domElements from './utils/dom-elements'
import inputElements from './utils/input-elements'

const styled = (styledInstance) => {
  const {
    htmlTag,
    stylesTemplates: formerStyles,
    propTypes: formerPropTypes,
    functional,
  } = styledInstance.extendOptions.styledComponent
  if (functional) {
    return (strings, ...tags) => (propTypes) => funcGen(
      htmlTag,
      [...formerStyles, [strings, tags]],
      { ...formerPropTypes, ...propTypes },
    )
  }
  return (strings, ...tags) => (propTypes) => compGen(
    htmlTag,
    [...formerStyles, [strings, tags]],
    { ...formerPropTypes, ...propTypes },
  )
}

domElements.forEach((elem) => {
  styled[elem] = (strings, ...tags) => styledFunc(elem, [strings, tags])
})

// input elements need to be components so v-model would still work
inputElements.forEach((elem) => {
  styled[elem] = (strings, ...tags) => styledComp(elem, [strings, tags])
})

export default styled
