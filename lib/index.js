module.exports = function (content) {
  let object = this.options.module.preLoaders
    .find(elm => elm.loader.includes('layout-loader'))

  let layout = object.options ? object.options.layout : undefined
  layout = layout || object.layout || 'markdown'
  if (typeof layout === 'function') layout = layout(this.resourcePath)

  let block = object.options ? object.options.block : undefined
  block = block || object.block || 'content'
  if (typeof block === 'function') block = block(this.resourcePath)

  content = content.replace(/(\r\n|\n|\r)/g, '$1    ')

  return `extends ${layout}
block ${block}
  :marked${content}`
}
