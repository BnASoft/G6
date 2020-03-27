import Comparator from '../Comparator'

export default class Heap {
  private heapContainer: string[]
  protected compare: Comparator
  constructor(comparatorFunction?: (a: unknown, b: unknown) => number) {
    if(new.target === Heap) {
      throw new Error('Cannot construct Heap instance directly')
    }

    this.heapContainer = []
    this.compare = new Comparator(comparatorFunction)
  }

  /**
   * 获取左子树的索引
   * @param parentIndex 父节点的索引
   */
  public getLeftChildIndex(parentIndex: number) {
    return (2 * parentIndex) + 1
  }

  /**
   * 获取右子树的索引
   * @param parentIndex 父节点的索引
   */
  public getRightChildIndex(parentIndex: number) {
    return (2 * parentIndex) + 2
  }

  /**
   * 获取父元素索引
   * @param childIndex 子元素索引
   */
  public getParentIndex(childIndex: number) {
    return Math.floor((childIndex - 1) / 2)
  }

  /**
   * 是否存在父元素
   * @param childIndex 子元素索引
   */
  public hasParent(childIndex: number) {
    return this.getParentIndex(childIndex) >= 0
  }

  /**
   * 是否存在左子树元素
   * @param parentIndex 父元素索引
   */
  public hasLeftChild(parentIndex: number) {
    return this.getLeftChildIndex(parentIndex) < this.heapContainer.length
  }

  /**
   * 是否存在右子树元素 
   * @param parentIndex 父元素索引
   */
  public hasRightChild(parentIndex: number) {
    return this.getRightChildIndex(parentIndex) < this.heapContainer.length
  }

  /**
   * 根据父元素索引获取左子树元素
   * @param parentIndex 父元素索引
   */
  public leftChild(parentIndex: number) {
    return this.heapContainer[this.getLeftChildIndex(parentIndex)]
  }

  /**
   * 根据父元素索引获取右子树元素
   * @param parentIndex 父元素索引
   */
  public rightChild(parentIndex: number) {
    return this.heapContainer[this.getRightChildIndex(parentIndex)]
  }

  /**
   * 根据子元素索引获取父元素
   * @param childIndex 子元素索引
   */
  public parent(childIndex: number) {
    return this.heapContainer[this.getParentIndex(childIndex)]
  }

  /**
   * 交互指定的两个索引元素
   * @param indexOne 第一个索引值
   * @param indexTwo 第二个索引值
   */
  public swap(indexOne: number, indexTwo: number) {
    const tmp = this.heapContainer[indexTwo]
    this.heapContainer[indexTwo] = this.heapContainer[indexOne]
    this.heapContainer[indexOne] = tmp
  }

  /**
   * 返回堆中第一个元素
   */
  public peek() {
    if(this.heapContainer.length === 0) {
      return null
    }

    return this.heapContainer[0]
  }

  /**
   * 轮询排序
   */
  public poll() {
    if(this.heapContainer.length === 0) {
      return null
    }

    if(this.heapContainer.length === 1) {
      return this.heapContainer.pop()
    }

    const item = this.heapContainer[0]
    // 将最后一个元素从尾部移到头部
    this.heapContainer[0] = this.heapContainer.pop()
    this.heapifyDown(0)
    
    return item
  }

  /**
   * 向堆中增加一个元素
   * @param item 要添加的元素
   */
  public add(item: string) {
    this.heapContainer.push(item)
    this.headpifyUp()
    return this
  }

  public remove(item: string, comparator = this.compare) {
    // 查找要删除的数量
    const numberOfItemsToRemove = this.find(item, comparator).length

    for(let iteration = 0; iteration < numberOfItemsToRemove; iteration += 1) {
      // 找到要删除元素的索引，因为堆每次排序都会改变索引值
      const indexToRemove = this.find(item, comparator).pop()

      // 如果要删除的是最后一个元素，直接删除即可
      if(indexToRemove === (this.heapContainer.length - 1)) {
        this.heapContainer.pop()
      } else {
        // 将堆中最后一个元素移到已删除的位置
        this.heapContainer[indexToRemove] = this.heapContainer.pop()

        const parentItem = this.parent(indexToRemove)

        // 如果没有父节点，或父节点位置不正确，则调用 heapifyDown ，否则调用 heapifyUp
        if(
          this.hasLeftChild(indexToRemove)
          && (
            !parentItem
            || this.pairIsInCorrectOrder(parentItem, this.heapContainer[indexToRemove])
          )) {
            this.heapifyDown(indexToRemove)
          } else {
            this.headpifyUp(indexToRemove)
          }
      }
    }

    return this
  }

  /**
   * 查找指定元素的索引值
   * @param item 要查找的元素
   * @param comparator 比较函数
   */
  public find(item: string, comparator = this.compare) {
    const foundItemIndices = []
    for(let itemIndex = 0; itemIndex < this.heapContainer.length; itemIndex += 1) {
      if(comparator.equal(item, this.heapContainer[itemIndex])) {
        foundItemIndices.push(itemIndex)
      }
    }

    return foundItemIndices
  }

  public isEmpty() {
    return !this.heapContainer.length
  }

  public toString() {
    return this.heapContainer.toString()
  }

  /**
   * 将指定的索引元素上移
   * @param customStartIndex 指定开始的索引位置
   */
  public headpifyUp(customStartIndex?: number) {
    // 默认取堆容器中最后一个元素（数组最后一个或树的右下角），并将其上移，直到相对于父元素以正确的顺序排列
    let currentIndex = customStartIndex || this.heapContainer.length - 1

    while(
      this.hasParent(currentIndex) 
      && !this.pairIsInCorrectOrder(this.parent(currentIndex), this.heapContainer[currentIndex])
      ) {
        this.swap(currentIndex, this.getParentIndex(currentIndex))
        currentIndex = this.getParentIndex(currentIndex)
      }
  }

  /**
   * 将指定的索引元素下移
   * @param customStartIndex 指定开始的索引位置
   */
  public heapifyDown(customStartIndex?: number) {
    let currentIndex = customStartIndex || 0
    let nextIndex = null

    while(this.hasLeftChild(currentIndex)) {
      if(
        this.hasRightChild(currentIndex) 
        && this.pairIsInCorrectOrder(this.rightChild(currentIndex), this.leftChild(currentIndex))
      ) {
        nextIndex = this.getRightChildIndex(currentIndex)
      } else {
        nextIndex = this.getLeftChildIndex(currentIndex)
      }

      if(this.pairIsInCorrectOrder(
        this.heapContainer[currentIndex], this.heapContainer[nextIndex]
      )) {
        break
      }

      this.swap(currentIndex, nextIndex)
      currentIndex = nextIndex
    }
  }

  /**
   * 检查堆元素排序是否正确
   * 对于最小堆，第一个元素必须小于等于最小值
   * 对于最大堆，第一个元素必须大于等于最大值
   * @param firstElement 
   * @param secondElement 
   */
  public pairIsInCorrectOrder(firstElement, secondElement): boolean {
    throw new Error(`
      You have to implement heap pair comparision method
      for ${firstElement} and ${secondElement} values.
    `)
  }
}