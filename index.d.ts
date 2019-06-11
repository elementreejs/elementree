type Model = object | Function | { new(): object }
type AppState = Model

type CallableWithModel = (state?: Model) => HTMLElement
type Prepared = (...args: any[]) => CallableWithModel

export function html(strings: TemplateStringsArray, ...keys: any[]): HTMLElement
export function render(strings: TemplateStringsArray, ...keys: any[]): HTMLElement
export function merge(selector: string, prepared: Prepared, state?: AppState): string | void
export function prepare(template: Function, state?: Model): Prepared
