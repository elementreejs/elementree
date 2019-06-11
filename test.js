const test = require('tape')
const { merge, prepare, render } = require('./dist/elementree')
const ready = require('./ready')

// test('render simple template', t => {
//   function template (app) {
//     t.equal(arguments.length, 1, 'app state was passed to root renderer')
//     t.ok(app.route, 'app state has route property')
//     return render`<body><p>Hello</p></body>`
//   }
//   merge('body', prepare(template))
//   ready(() => {
//     t.ok(document.querySelector('p').innerHTML.includes('Hello'),
//       'template rendered')
//     t.end()
//   })
// })

// test('passing arguments to child', t => {
//   function child (fromParent) {
//     t.equal(arguments.length, 1, 'child only includes args passed from parent')
//     return render`<p id="child">${fromParent}</p>`
//   }
//   function parent () {
//     return render`
//       <body>
//         <p id="parent">Hello</p>
//         ${child('World')}
//       </body>
//     `
//   }
//   merge('body', prepare(parent))
//   ready(() => {
//     t.equal(document.querySelector('#parent').innerHTML,
//       'Hello', 'parent template rendered')
//     t.equal(document.querySelector('#child').innerHTML,
//       'World', 'child value substituted')
//     t.end()
//   })
// })

// test('render simple template with state', t => {
//   const state = () => ({ value: 'Hello' })
//   function template ({ value }, { route }) {
//     t.ok(arguments.length, 'template state and app state was passed to root renderer')
//     t.ok(route, 'app state passed to root with route property')
//     return render`<body><p>${value}</p></body>`
//   }
//   merge('body', prepare(template, state))
//   ready(function () {
//     t.equal(document.querySelector('p').innerHTML,
//       'Hello', 'template state value substituted')
//     t.end()
//   })
// })

// test('passing args to child with state', t => {
//   const childState = () => ({ value: 'World' })
//   function childTemplate ({ value }, parent) {
//     t.ok(arguments.length, 2, 'child state and parent arguments passed to child')
//     return render`
//       <p id="child">${parent} ${value}</p>
//     `
//   }
//   const child = prepare(childTemplate, childState)

//   const parentState = () => ({ value: 'Hello' })
//   function parentTemplate ({ value }) {
//     return render`
//       <body>
//         <p id="parent">${value}</p>
//         ${child('Brave New')}
//       </body>
//     `
//   }
//   merge('body', prepare(parentTemplate, parentState))
//   ready(function () {
//     t.equal(document.querySelector('#parent').innerHTML,
//       'Hello', 'parent value rendered')
//     t.equal(document.querySelector('#child').innerHTML,
//       'Brave New World', 'child state and parent arguments rendered')
//     t.end()
//   })
// })

// test('re-render on state change', t => {
//   t.plan(3)
//   function template (state, app) {
//     t.ok(app, 'appstate is defined')
//     return render`
//       <body>
//         <p>${state.value} ${app.user.first} ${app.user.last}</p>
//         <button onclick=${toggle}>
//           Toggle
//         </button>
//       </body>
//     `
//     function toggle () {
//       state.value = 'Goodbye'
//     }
//   }
//   const state = () => ({ value: 'Hello' })
//   const app = () => ({
//     user: { first: 'Mark', last: 'Stahl' }
//   })
//   merge('body', prepare(template, state), app)
//   ready(function () {
//     document.querySelector('button').click()
//     const result = `Goodbye Mark Stahl`
//     t.equal(document.querySelector('p').innerHTML, result, 'template re-rendered')
//     t.end()
//   })
// })

// test('templates have different state instances', t => {
//   const childState = () => ({ value: 'sun' })
//   function childTemplate (state, parent) {
//     state.value = (parent === 'goodnight') ? 'moon' : state.value
//     return render`
//       <p class="child-${parent}">${parent} ${state.value}</p>
//     `
//   }
//   const child = prepare(childTemplate, childState)

//   function parentTemplate () {
//     return render`
//       <body>
//         <p class="child1">${child('hello')}</p>
//         <p class="child2">${child('goodnight')}</p>
//       </body>
//     `
//   }
//   merge('body', prepare(parentTemplate))
//   ready(function () {
//     t.equal(document.querySelector('.child-hello').innerHTML,
//       'hello sun', 'first instance rendered correctly')
//     t.equal(document.querySelector('.child-goodnight').innerHTML,
//       'goodnight moon', 'second instance rendered correctly')
//     t.end()
//   })
// })

test.only('render simple template with state class', t => {
  t.plan(1)
  class State {
    constructor () { this.value = 'Hello' }
  }
  function template ({ value }) {
    return render`<body><p>${value}</p></body>`
  }
  merge('body', prepare(template, State))
  ready(function () {
    t.equal(document.querySelector('p').innerHTML,
      'Hello', 'template state as class rendered correctly')
    t.end()
  })
})

test('render simple template with constructor function', t => {
  t.plan(1)
  function State () { this.value = 'Hello' }
  function template ({ value }) {
    return render`<body><p>${value}</p></body>`
  }
  merge('body', prepare(template, State))
  ready(function () {
    t.equal(document.querySelector('p').innerHTML,
      'Hello', 'template state as constructor rendered correctly')
    t.end()
  })
})

test('render simple template with state class as app state', t => {
  t.plan(1)
  class State {
    constructor () { this.value = 'Hello' }
  }
  function template ({ value }) {
    return render`<body><p>${value}</p></body>`
  }
  merge('body', prepare(template), State)
  ready(function () {
    t.equal(document.querySelector('p').innerHTML,
      'Hello', 'app state as class rendered correctly')
    t.end()
  })
})

test('render simple template with constructor function as app state', t => {
  t.plan(1)
  function State () { this.value = 'Hello' }
  function template ({ value }) {
    return render`<body><p>${value}</p></body>`
  }
  merge('body', prepare(template), State)
  ready(function () {
    t.equal(document.querySelector('p').innerHTML,
      'Hello', 'app state as constructor rendered correctly')
    t.end()
  })
})
