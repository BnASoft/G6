import Heap from './heap'

export default class MinHeap extends Heap {
  pairIsInCorrectOrder(firstElement, secondElement) {
    return this.compare.lessThanOrEqual(firstElement, secondElement)
  }
}
