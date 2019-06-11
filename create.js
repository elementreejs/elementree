const onchange = require('on-change')

function proxyConstructor (obj, callback) {
  return new Proxy(obj, {
    construct (target, ...args) {
      return Reflect.construct(
        function createTarget () {
          const proto = Object.create(target.prototype)
          const observable = onchange(proto, callback)
          try {
            return target.prototype.constructor.call(observable)
          } catch (e) { }
          return observable
        },
        ...args
      )
    }
  })
}

module.exports = function create (model, callback) {
  let Model = model
  if (typeof model !== 'function') Model = function () { return model }

  if (Model.prototype) {
    const Proxied = proxyConstructor(Model, callback)
    return new Proxied()
  } else {
    return onchange(Model(), callback)
  }
}
