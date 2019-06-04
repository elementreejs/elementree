const __merge = require('nanomorph')
const __render = require('nanohtml')
const onChange = require('on-change')

const ready = require('./ready')

const exprCache = new WeakMap()
let rendering = false
let root = null
let tree = null

function __newModel (Model) {
  const instance = (Model.prototype) ? new Model() : Model()
  return onChange(instance, __renderTree)
}

function __renderTree () {
  if (rendering) { return }
  rendering = true
  rendering = !__merge(root, tree())
}

function merge (selector, prepared, appState = () => ({})) {
  const app = prepared(__newModel(appState))
  const model = (app.initWith) ? __newModel(app.initWith) : undefined
  tree = () => app(model)
  ready(() => {
    root = document.querySelector(selector)
    __renderTree()
  })
}

function prepare (template, state) {
  return (...args) => {
    function callWithModel (model) {
      return (model) ? template(model, ...args) : template(...args)
    }
    callWithModel.callable = true
    callWithModel.initWith = state
    return callWithModel
  }
}

function render (strings, ...exprs) {
  let values = exprCache.get(strings)
  if (!values) {
    values = exprs.map(e => {
      return (e && e.callable && e.initWith) ? __newModel(e.initWith) : e
    })
    exprCache.set(strings, values)
  }
  const evaluated = exprs.map((e, i) => {
    return (e && e.callable) ? e(values[i]) : e
  })
  return __render(strings, ...evaluated)
}

module.exports = {
  html: require('nanohtml/raw'),
  prepare,
  merge,
  render
}
