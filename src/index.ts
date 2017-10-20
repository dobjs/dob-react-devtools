import { globalState } from 'dob-react'
import { DebugWrapper } from './debug-wrapper/debug-wrapper.component'
import { ToolBox } from './tool-box/tool-box.component'
import { startDebug as dobStartDebug, stopDebug as dobStopDebug, useStrict } from 'dob'

globalState.DebugToolBox = ToolBox
globalState.DebugWrapper = DebugWrapper
