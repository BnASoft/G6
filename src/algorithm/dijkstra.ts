import PriorityQueue from './struct/priorityQueue'
import Graph from './struct/graph/Graph'
import GraphVertex from './struct/graph/GraphVertex';

export default function dijkstra(graph: Graph, startVertex: GraphVertex) {
  // 初始化需要的变量
  // 指定节点到各个节点的距离
  const distances = {}

  // 已经访问过的顶点
  const visitedVertices = {}
  const previousVertices = {}  as { [key: string]: GraphVertex}
  const queue = new PriorityQueue()

  graph.getAllVertices().map((vertex: GraphVertex) => {
    distances[vertex.getKey()] = Infinity
    previousVertices[vertex.getKey()] = null
  })

  // 初始点距离自己的距离为0
  distances[startVertex.getKey()] = 0

  queue.add(startVertex.getKey(), distances[startVertex.getKey()])

  // 迭代优先队列，直到优先队列为空
  while(!queue.isEmpty()) {
    // 获取下一个最近的节点的key
    const currentKey = queue.poll()

    const currentVertex = graph.getVertexByKey(currentKey)

    // 遍历当前节点没有访问的所有邻居节点
    currentVertex.getNeighbors().forEach((neighbor: GraphVertex) => {
      // 不访问已经访问过的节点
      if(!visitedVertices[neighbor.getKey()]) {
        // 更新当前节点到每个邻居的距离
        const edge = graph.findEdge(currentVertex, neighbor)

        const existingDistanceToNeighbor = distances[neighbor.getKey()]
        const distanceToNeighborFromCurrent = distances[currentKey] + edge.weight

        // 如果找到距离邻居最短的路径则更新
        if(distanceToNeighborFromCurrent < existingDistanceToNeighbor) {
          distances[neighbor.getKey()] = distanceToNeighborFromCurrent
          
          // 更改优先队列中邻居节点的优先级，因为它的距离更近
          if(queue.hasValue(neighbor.getKey())) {
            queue.changePriority(neighbor.getKey(), distances[neighbor.getKey()])
          }
          
          // 记录上一个最近的节点
          previousVertices[neighbor.getKey()] = currentVertex
        }

        // 将邻居节点添加到队列中以便下一步访问
        if(!queue.hasValue(neighbor.getKey())) {
          queue.add(neighbor.getKey(), distances[neighbor.getKey()])
        }
      }
    })

    // 将当前节点添加到已访问的节点对象中，以免重复访问
    visitedVertices[currentKey] = currentVertex
  }

  // 返回所有顶点的最短路径集和距离图中所有路径的最短路径
  return {
    distances,
    previousVertices
  }
}