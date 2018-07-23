/**
 * @fileOverview layout controller
 * @author huangtonger@aliyun.com
 */

const Base = require('./base');

class Controller extends Base {
  getDefaultCfg() {
    return {
      /**
       * graph object
       * @type {object}
       */
      graph: null,

      /**
       * if auto layout afterchange
       * @type {boolean|string}
       * could be true false 'once'
       */
      auto: true,

      /**
       * layout processer
       * @type {object}
       */
      processer: null
    };
  }
  constructor(cfg) {
    super(cfg);
    this._init();
  }
  _init() {
    const graph = this.graph;
    graph.on('afteritemdraw', ev => {
      const item = ev.item;
      const keyShape = item.getKeyShape();
      const model = item.getModel();
      if (item.isEdge) {
        model.lineWidth = keyShape.attr('lineWidth');
      } else if (item.isNode || item.isGroup) {
        const bbox = item.getBBox();
        model.width = bbox.width;
        model.height = bbox.height;
      }
    });
    graph.on('afterchange', ({ action }) => {
      const auto = this.auto;
      if (auto === 'once') {
        if (action === 'changeData') {
          !graph.destroyed && this.layout();
        }
      } else {
        this.auto && !graph.destroyed && this.layout();
      }
    });
  }
  changeLayout(processer) {
    this.processer = processer;
    this.layout();
  }
  layout() {
    const graph = this.graph;
    const processer = this.processer;
    graph.emit('beforelayout');
    const nodes = graph.getNodes()
      .filter(node => {
        return node.isVisible();
      })
      .map(edge => {
        return edge.getModel();
      });
    const edges = graph.getEdges()
      .filter(edge => {
        return edge.isVisible();
      })
      .map(edge => {
        return edge.getModel();
      });
    const groups = graph.getGroups()
    .filter(group => {
      return group.isVisible();
    })
    .map(group => {
      return group.getModel();
    });
    graph._executeLayout(processer, nodes, edges, groups);
    graph.updateNodePosition();
    graph.emit('afterlayout');
  }
  getLayoutProcesser() {
    return this.processer;
  }
}

module.exports = Controller;