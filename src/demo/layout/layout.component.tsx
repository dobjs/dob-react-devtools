import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Props, State } from './layout.type';
import { PureComponent } from '../utils/pure-render'

import SimpleCrud from '../pages/simple-crud/index.component'
import GaeaEditor from '../pages/gaea-editor/index'

export default class Layout extends PureComponent<Props, State> {
  public static defaultProps = new Props();
  public state = new State();

  public render() {
    return (
      <Router>
        <div>
          <div>
            <Link to="/" >SimpleCrud</Link>
            <Link to="/gaea-editor" >GaeaEditor</Link>
          </div>

          <Switch >
            <Route exact path="/" component={SimpleCrud} />
            <Route exact path="/gaea-editor" component={GaeaEditor} />
          </Switch>
        </div>
      </Router>
    );
  }
}