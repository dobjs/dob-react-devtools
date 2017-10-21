import * as React from "react"
import * as ReactDOM from "react-dom"
import * as Styled from "./icon.style"
import * as typings from "./icon.type"

import add from "../icons/add"
import addFile from "../icons/add-file"
import addFolder from "../icons/add-folder"
import close from "../icons/close"
import component from "../icons/component"
import database from "../icons/database"
import edit from "../icons/edit"
import file from "../icons/file"
import folder from "../icons/folder"
import keybroad from "../icons/keybroad"
import page from "../icons/page"
import remove from "../icons/remove"
import arrowRight from "../icons/arrow-right"
import arrowTop from "../icons/arrow-top"
import arrowLeft from "../icons/arrow-left"
import arrowBottom from "../icons/arrow-bottom"
import setting from "../icons/setting"
import trash from "../icons/trash"
import scatter from '../icons/scatter'
import LightBulbOff from '../icons/light-bulb-off'
import LightBulbOn from '../icons/light-bulb-on'

const iconMap = new Map<string, (size: number) => React.ReactElement<any>>()
iconMap.set("close", close)
iconMap.set("page", page)
iconMap.set("component", component)
iconMap.set("folder", folder)
iconMap.set("file", file)
iconMap.set("addFile", addFile)
iconMap.set("addFolder", addFolder)
iconMap.set("setting", setting)
iconMap.set("remove", remove)
iconMap.set("trash", trash)
iconMap.set("add", add)
iconMap.set("keybroad", keybroad)
iconMap.set("database", database)
iconMap.set("arrow-right", arrowRight)
iconMap.set("arrow-top", arrowTop)
iconMap.set("arrow-left", arrowLeft)
iconMap.set("arrow-bottom", arrowBottom)
iconMap.set("edit", edit)
iconMap.set("scatter", scatter)
iconMap.set("light-bulb-off", LightBulbOff)
iconMap.set("light-bulb-on", LightBulbOn)

export class Icon extends React.Component<typings.Props, typings.State> {
  public static defaultProps = new typings.Props()
  public state = new typings.State()

  public render() {
    return iconMap.get(this.props.type)(this.props.size)
  }
}
