import { Connect } from "dob-react"
import * as React from "react"
import Icon from "../../components/icon/src"
import { Tooltip } from "../../components/tooltip/src"
import { StoreProps } from "../../stores"
import * as Styled from "./style"

export class Props extends StoreProps<void, void> {

}

export class State {

}

@Connect
class DragMenuButton extends React.Component<Props, State> {
    public static defaultProps = new Props()
    public state = new State()

    public render() {
        return (
            <Tooltip title="添加组件">
                <Styled.Container onClick={this.handleClick} theme={{ active: this.props.stores.ApplicationStore.leftTool === "dragMenu" }}>
                    <Icon type="component" />
                </Styled.Container>
            </Tooltip>
        )
    }

    private handleClick = () => {
        if (this.props.stores.ApplicationStore.leftTool !== "dragMenu") {
            this.props.actions.ApplicationAction.setLeftTool("dragMenu")
            this.props.actions.ApplicationAction.setRightTool(null)
        } else {
            this.props.actions.ApplicationAction.setLeftTool(null)
            this.props.actions.ApplicationAction.setRightTool(null)
        }
    }
}

export default {
    position: "leftBarTop",
    class: DragMenuButton
}
