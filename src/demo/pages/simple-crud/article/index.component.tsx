import { Connect } from "dob-react"
import * as React from 'react';
import { PureComponent } from '../../../utils/pure-render';
import { Props, State } from './index.type';

@Connect
export default class Article extends PureComponent<Props, State> {
  public static defaultProps = new Props();
  public state = new State();

  public render() {
    return (
      <li>
        <p>
          title: {this.props.article.title}
        </p>
        <p>
          author: {this.props.article.author}
        </p>
        <input
          placeholder="change current article's title.."
          onChange={event => {
            this.props.ArticleAction.changeArticleTitle(this.props.index, event.currentTarget.value)
          }}
        />
        <button onClick={() => {
          this.props.ArticleAction.removeArticle(this.props.index)
        }}>remove</button>
      </li>
    );
  }
}