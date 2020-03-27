import Vertex from './GraphVertex'
import Edge from './GraphEdge'
import GraphEdge from './GraphEdge';

export default class Graph {
  vertices: {
    [key: string]: Vertex
  };
  edges: {
    [key: string]: Edge
  };
  isDirected: boolean;

  public constructor(isDirected?: boolean) {
    this.vertices = {}
    this.edges = {}
    this.isDirected = isDirected
  }

  /**
   * 增加节点
   * @param vertex 节点
   */
  public addVertex(vertex: Vertex) {
    this.vertices[vertex.getKey()] = vertex

    return this
  }

  /**
   * 通过节点唯一标识符查询对应的节点
   * @param vertexKey 节点唯一标识符
   */
  public getVertexByKey(vertexKey: string) {
    return this.vertices[vertexKey]
  }

  /**
   * 查找指定节点的邻居节点
   * @param vertex 节点实例
   */
  public getNeighbors(vertex: Vertex): Vertex[] {
    return vertex.getNeighbors()
  }

  /**
   * 查询所有的节点
   */
  public getAllVertices(): Vertex[] {
    const vertices = []
    for(const key in this.vertices) {
      vertices.push(this.vertices[key])
    }
    return vertices
  }

  /**
   * 添加一条边
   * @param edge 边实例
   */
  public addEdge(edge: GraphEdge) {
    // 查找起始和结束节点
    let startVertex = this.getVertexByKey(edge.startVertex.getKey())
    let endVertex = this.getVertexByKey(edge.endVertex.getKey())

    // 如果不存在起始节点，则插入起始节点
    if(!startVertex) {
      this.addVertex(edge.startVertex)
      startVertex = this.getVertexByKey(edge.startVertex.getKey())
    }

    if(!endVertex) {
      this.addVertex(edge.endVertex)
      endVertex = this.getVertexByKey(edge.endVertex.getKey())
    }

    // 检测边是否已经添加到 graph 中
    if(this.edges[edge.getKey()]) {
      throw new Error(`Edge ${edge.getKey()} has already been added before`)
    } else {
      this.edges[edge.getKey()] = edge
    }

    startVertex.addEdge(edge)

    // 如果是无向图，则需要将边也添加到结束节点中
    if(!this.isDirected) {
      endVertex.addEdge(edge)
    }

    return this
  }

  /**
   * 指定起始节点和结束节点查询边
   * @param startVertex 起始节点实例
   * @param endVertex 结束节点实例
   */
  public findEdge(startVertex: Vertex, endVertex: Vertex): GraphEdge {
    const vertex = this.getVertexByKey(startVertex.getKey())

    if(!vertex) {
      return null
    }

    return vertex.findEdge(endVertex)
  }

  /**
   * 获取节点的索引
   */
  getVerticesIndices() {
    const verticesIndices = {}
    this.getAllVertices().forEach((vertex: Vertex, index: number) => {
      verticesIndices[vertex.getKey()] = index
    })

    return verticesIndices
  }

  /**
   * 获取 Graph 数据结构的邻接矩阵
   */
  public getAdjacencyMatrix() {
    const vertices = this.getAllVertices()
    const verticesIndices = this.getVerticesIndices()

    // 初始化邻接矩阵
    const adjacencyMatrix = Array(vertices.length).fill(null).map(() => {
      return Array(vertices.length).fill(Infinity)
    })

    // 填充邻接矩阵的 columns
    vertices.forEach((vertex: Vertex, index: number) => {
      vertex.getNeighbors().forEach((neighbor: Vertex) => {
        const neighborIndex = verticesIndices[neighbor.getKey()]
        adjacencyMatrix[index][neighborIndex] = this.findEdge(vertex, neighbor).weight
      })
    })

    return adjacencyMatrix
  }

  public toString() {
    return Object.keys(this.vertices).toString()
  }
}