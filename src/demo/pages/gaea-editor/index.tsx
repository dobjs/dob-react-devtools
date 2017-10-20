import * as React from 'react'
import GaeaEditor from "./gaea-editor.component"

export { StoreProps } from "./stores/index"
export { GaeaEditor }

export default class Main extends React.PureComponent<any, any> {
  render() {
    return (
      <div style={{ height: 'calc(100vh - 18px)' }}>
        <GaeaEditor />
      </div>
    )
  }
}