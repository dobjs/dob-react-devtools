import { Connect } from 'dob-react';
import * as React from 'react';
import { PureComponent } from '../../utils/pure-render';
import { Props, State } from './index.type';

import Article from './article/index.component'

@Connect
export default class Page1 extends PureComponent<Props, State> {
  public static defaultProps = new Props();
  public state = new State();

  public render() {
    const Articles = this.props.ArticleStore.articles.map((article, index) => {
      return <Article key={article.id} index={index} article={article} />
    })

    return (
      <div>
        <button onClick={() => {
          this.props.ArticleAction.addArticle()
        }}>add article</button>

        <button onClick={() => {
          this.props.ArticleAction.addArticleAndChangeTitle('custom name')
        }}>add article and change name</button>

        <button onClick={() => {
          this.props.ArticleAction.runAsyncTest()
        }}>test async action {this.props.ArticleStore.a.b.c.d}</button>

        <button onClick={() => {
          this.props.ArticleAction.runAnonymousTest()
        }}>test anonymous action</button>

        <ul>
          {Articles}
        </ul>
      </div>
    );
  }
}