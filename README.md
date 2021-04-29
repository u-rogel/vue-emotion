# vue-emotion

CSS-in-JS for the Vue developer, based on emotion.js.

## Install

```bash
yarn add @u-rogel/vue-emotion
```

or:

```bash
npm install @u-rogel/vue-emotion
```

## Table of Contents

<!-- toc -->

- [Motivation](#Motivation)
- [Usage](#Usage)
  * [Static](#Static)
  * [Dynamic](#Dynamic)
  * [Extend Component Styles](#Extend-Component-Styles)
  * [Animations](#Animations)
  * [More](#More)
- [Theme](#Theme)
  * [Set Global Theme](#Set-Global-Theme)
  * [Use Global Theme](#Use-Global-Theme)
- [Classes Naming](#Classes-Naming)
  * [Debugging](#Debugging)
  * [External Stylesheet](#External-Stylesheet)
- [Road Map](#Road-Map)

<!-- tocstop -->

## Motivation 

Vue applications and components can get very large in size. When trying to follow on the possible visual outcome of a component it may get very tricky. Static styles would be declared in the `<style>` tag at the bottom of the vue file, while dynamic styles will be injected as `:style="'border: 1px solid ${myColor}'"` or as an additional class to the component.

This situation leads to the necessity to search in 2-5 different places in order to understand how your component will look like in the end and how you can manipulate it.

Also the `<style>` part of your code is not monitored by **eslint**, so unused styles might continue to lay in there without noticing.

**CSS-in-JS** to the rescue!

Using this technic you can maintain the flexibility of dynamic styling, which will be living right next to your static ones. So in one look you can figure out what are the possible outcomes.
Using the vanilla part of **emotion.js** with vue-emotion you can enjoy all the things JS can offer you, while generating on the *fly* a complete CSS functional styling document with all it's features. 

## Usage

### Static

Simple usage in a Vue component:

```vue
<script>
import styled from '@u-rogel/vue-emotion'

const BaseButton = styled.button`
  padding: 20px 30px;
  background: #ffaa44;
`()

export default {
  components: {
    BaseButton,
  }
}
</script>
```

### Dynamic

Dynamic styles based on props:

```vue
<template>
  <base-button color="blue">Click Me</base-button>
</template>

<script>
import styled from '@u-rogel/vue-emotion'

const BaseButton = styled.button`
  padding: 20px 30px;
  background: #ffaa44;
  color: ${p => p.color || 'black'};
`({
  color: String,
})

export default {
  components: {
    BaseButton,
  }
}
</script>
```

### Extend Component Styles

Extend component styles with another component:

```vue
<template>
  <link-button color="blue">Click Me</link-button>
</template>

<script>
import styled from '@u-rogel/vue-emotion'

const BaseButton = styled.button`
  padding: 20px 30px;
  background: #ffaa44;
  color: ${p => p.color || 'black'};
`({
  color: String,
})

const LinkButton = styled(BaseButton)`
  cursor: pointer;
`()

export default {
  components: {
    LinkButton,
  }
}
</script>
```
** *note the props declarations is passed onward to the extended component, so no need to declare them again.*


Extend component styles with an emotion css class:

```vue
<script>
import styled, { css } from '@u-rogel/vue-emotion'

const linkCursor = css`
  cursor: pointer;
`

const BaseButton = styled.button`
  padding: 20px 30px;
  background: #ffaa44;
`()

const LinkButton = styled(BaseButton)`
  ${linkCursor}
  border: none;
`()

export default {
  components: {
    LinkButton,
  }
}
</script>
```
** *note the css import is the underlying @emotion/css function.*

### Animations

Animate a component with css-in-js:

```vue
<script>
import styled, { keyframes } from '@u-rogel/vue-emotion'

const anim = keyframes`
  0% {
    transform: translate(0%,0%);
  }
  50% {
    transform: translate(0%,100%);
  }
  100% {
    transform: translate(0%,0%);
  }
`

const AnimatedButton = styled.button`
  padding: 20px 30px;
  background: #ffaa44;
  animation: ${anim} 2s ease-in;
`()

export default {
  components: {
    AnimatedButton,
  }
}
</script>
```
** *note the props declarations is passed onward to the extended component so no need to declare them again.*

### More

Please check the [emotion.js](https://emotion.sh) website for more examples and use cases. Check how to use: Scss selectors, pseudo class, media queries and other useful features.


## Theme

### Set Global Theme

Use the plugin to set the theme:

```js
import { VEGlobalTheme } from '@u-rogel/vue-emotion'

const theme = {
  primary: 'green',
  secondary: 'blue',
};

Vue.use(VEGlobalTheme, theme)
```
### Use Global Theme

Use your theme:

```vue
<script>
import styled from '@u-rogel/vue-emotion'

const BaseButton = styled.button`
  padding: 20px 30px;
  background: #ffaa44;
  color: ${(_, t) => t.primary}
`()

export default {
  components: {
    BaseButton,
  }
}
</script>
```
** *note the declared theme is available on the global vue instance with `this.$veTheme`*

## Classes Naming

Emotion.js will generate automated class names. For some reasons we would like to have human readable class names.

### Debugging

For debugging it is highly recommended to use the emotion.js `label` property.

```vue
<script>
import styled from '@u-rogel/vue-emotion'

const BaseButton = styled.button`
  label: base-button;
  padding: 20px 30px;
  background: #ffaa44;
`()

export default {
  components: {
    BaseButton,
  }
}
</script>
```
** *the attached class name will be: `css-'auto-class-name'-base-button`*

This makes it much easier to look on a component in the DOM and to find the generating component file.

### External Stylesheet

To make it easier for existing applications to adopt the library over time, you can specify a CSS class to attach to the component.

```vue
<template>
  <base-button class="my-button-class">Click Me</base-button>
</template>

<script>
import styled from '@u-rogel/vue-emotion'

const BaseButton = styled.button`
  padding: 20px 30px;
  background: #ffaa44;
`()

export default {
  components: {
    BaseButton,
  }
}
</script>
```
** *the attached class name will be: 
`css-'auto-class-name' my-button-class`. Means you can attach styles from a classic stylesheet to you component*

This makes it much easier to look on a component in the DOM and to find the generating component file.

## Road Map

### Finish support for Vue2:
1. Scoped Theme (Usability)
2. Convert Components to functional (Performance)

### Support for Vue3:
1. Install-able (Usability)
2. TS support (Usability)

### Internal improvements:
1. Migrate to the internal emotion.js tools (Performance)
2. Costume style injection target (Web-components)
3. Server-Side-Rendering (Performance) 

## Collaborations

Please feel free to submit PR and push the library forward.

If you find a bug or missing feature, do submit an issue.
