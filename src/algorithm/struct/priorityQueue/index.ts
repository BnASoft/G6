import MinHeap from '../heap/minHeap'
import Comparator from '../Comparator'

// 优先队列与最小堆基本相同，除过比较两个元素时更关注优先级而不是元素的值
export default class PriorityQueue extends MinHeap {
  private priorities

  constructor() {
    super()

    this.priorities = new Map()

    // 使用自定义比较函数，比较元素的顺序而不是元素的值
    this.compare = new Comparator(this.comparePriority.bind(this))
  }

  /**
   * 将元素添加到优先队列中
   * @param item 元素值
   * @param priority 优先级
   */
  public add(item: string, priority = 0) {
    this.priorities.set(item, priority)
    super.add(item)
    return this
  }

  /**
   * 从优先队列中删除指定元素
   * @param item 要删除的元素
   * @param customFindingComparator 
   */
  public remove(item: string, customFindingComparator) {
    super.remove(item, customFindingComparator)
    this.priorities.delete(item)
    return this
  }

  /**
   * 修改优先队列中指定元素的优先级
   * @param item 元素
   * @param priority 优先级
   */
  public changePriority(item: string, priority: number) {
    this.remove(item, new Comparator(this.compareValue))
    this.add(item, priority)
    return this
  }

  /**
   * 通过元素值查找元素
   * @param item 元素值
   */
  public findByValue(item: string) {
    return this.find(item, new Comparator(this.compareValue))
  }

  /**
   * 检查在队列中是否已经存在指定元素
   * @param item 
   */
  public hasValue(item: string) {
    return this.findByValue(item).length > 0
  }

  /**
   * 比较两个元素大小
   * @param a 
   * @param b 
   */
  public comparePriority(a: string, b: string) {
    if(this.priorities.get(a) === this.priorities.get(b)) {
      return 0
    }

    return this.priorities.get(a) < this.priorities.get(b) ? -1 : 1
  }

  /**
   * 比较两个元素的值
   * @param a 
   * @param b 
   */
  public compareValue(a: string, b: string) {
    if(a === b) {
      return 0
    }
    return a < b ? -1 : 1
  }
}