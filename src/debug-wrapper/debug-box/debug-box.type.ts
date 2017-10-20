export class Props {
  dyDebug?: any
}

export class State {
  /**
   * debug id 数组
   */
  debugIds: number[] = []
  /**
   * 当前渲染次数
   */
  renderCount = 0
  /**
   * 是否显示渲染次数
   */
  showCount = false
  /**
   * 是否展示详情
   */
  showDetail = false

  left = 0
  top = 0
  width = 0
  height = 0
}