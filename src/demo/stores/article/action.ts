import { Action, observable } from 'dob'
import { injectFactory, inject } from 'dependency-inject';
import { ArticleStore } from './store'

function waitOneMinute() {
  return new Promise(resolve => {
    setTimeout(resolve, 1000)
  })
}

export class ArticleAction {
  @inject(ArticleStore) private ArticleStore: ArticleStore;

  @Action addArticle() {
    return this.ArticleStore.articles.push({
      id: Math.random(),
      title: '测试',
      author: 'ascoders'
    })
  }

  @Action changeArticleTitle(index: number, title: string) {
    this.ArticleStore.articles[index].title = title

  }

  @Action removeArticle(index: number) {
    this.ArticleStore.articles.splice(index, 1)
  }

  @Action multipleAction(title: string) {
    const index = this.addArticle()
    this.changeArticleTitle(index - 1, title)
  }

  @Action runAsyncTest() {
    this.ArticleStore.a = {
      b: {
        c: {
          d: 6
        }
      }
    }
    waitOneMinute().then(() => {
      Action(() => {
        this.ArticleStore.a.b.c.d = 7
        this.ArticleStore.a.b.c.d = 8
        this.ArticleStore.a.b.c.d = 9
      })
      this.ArticleStore.a.b.c.d = 7
      this.ArticleStore.a.b.c.d = 8
      this.ArticleStore.a.b.c.d = 9
    })
  }
}
