![stability-experimental](https://img.shields.io/badge/stability-experimental-orange.svg?style=flat-square) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square)](https://standardjs.com)  [![Build Status](https://img.shields.io/travis/com/elementreejs/elementree.svg?style=flat-square)](https://travis-ci.com/elementreejs/elementree)

# Elementree
> "Less framework, more work."

Elementree is a very extremely small front-end JavaScript "framework" with a focus
on getting the job done with the mimimum amount of framework-y concepts.

## Features

* Tiny size. Elementree is less than 6 KB with all dependencies and compressed.
* Minimal cognitive overhead. More time focused on the problem domain and less time thumbing through framework documentation.
* Nothing fancy. No transpiling, compiling, or proprietary data shapes. Just functions and template strings.

## Philosophy

The APIs introduced in Elementree and used during development are deliberately kept small in number and complexity. This fosters focus on the problem domain and process, as opposed to the glory of the framework.

## Installation

```sh
$ npm install --save elementree
```

```js
import {
  merge,   // merge the document with the rendering of a template
  prepare, // prepare the rendering of a template with its state
  html,    // return HTML as HTML, without escaping the characters
  render,  // render JS template strings as HTML
} from 'elementree'
```

## Example

```js
import { merge, prepare, render } from 'elementree'

function template (model, { user }) {
  return render`
    <body>
      <p>${model.greeting}, ${user.first} ${user.last}</p>
      <button onclick=${toggle}>
        Toggle
      </button>
    </body>
  `

  function toggle () {
    model.greeting = 'Goodbye'
  }
}

// state local to the template above
const state = { greeting: 'Hello' }

// application state
const app = {
  user: { first: 'Mark', last: 'Stahl' }
}

// export the result and do some server-side rendering
module.exports = merge('body', prepare(template, state), app)
```

## Elementree API

```js
merge(to: String, renderer: Function [, state: Object | Function]) -> String | undefined
```

`merge` wires up a renderer and an optional object representing an application
state and merges it to a selector or DOM element. Simply put, `merge` renders
your root template to the DOM.

The first argument to `merge` is a string which will be used by `document.querySelector`, after `DOMContentLoaded`, to find root element. The second argument is the renderer. This argument is a `Function` that returns a function that returns an `HTMLElement` such as a `prepare` call. The third, optional, argument is an object or function that returns an object representing the application's state. This object will passed to the renderer function as an argument.

Elementree adds a single property onto the application's state object. The `route` property is a concatenation of `location.pathname`, `location.search` and `location.hash`. Updating the `route` property will cause a `history.pushState`. Updating the address through browser interations will update the `route` property.

If the `window` object does not exist the call to `merge` will return the `outerHTML` on the result of the rendering.


```js
html`unescaped: String` -> HTMLElement
```

Use `html` to interpolate HTML, without escaping it, directly into your template.


```js
prepare(template: Function [, model: Object | Function]) -> (Function -> HTMLElement)
```

`prepare` a template with a model object together, creating a renderer function. At a minimum, a template function is required to be passed as the first argument. The second argument, which is optional, is an object or  function that returns an object that is the localized model to the template. If the template function is joined with a model, the model **will ALWAYS be the 0th argument to the template function**. All other arguments will follow.


```js
render`template: String` -> HTMLElement
```

A tagged template function. Turn a JavaScript template string into an `HTMLElement`. If the template has more than one root element a `DocumentFragment` is returned.

## Attribution

This project would suck a whole lot more without the input from my awesome co-workers at [Bitovi](https://bitovi.com), the inspiration from [@choojs](https://github.com/choojs), and the amazing packages from [@sindresorhus](https://github.com/sindresorhus). Thank you.