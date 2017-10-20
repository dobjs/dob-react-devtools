import * as React from 'react'
import { IDebugInfo } from 'dob'

export class Props {
  searchValue?: string = ''
  debugInfo?: IDebugInfo
  dyDebug?: any
  onMouseEnter?: React.MouseEventHandler<any>
  onMouseLeave?: React.MouseEventHandler<any>
  onClick?: React.MouseEventHandler<any>
}

export class State {

}