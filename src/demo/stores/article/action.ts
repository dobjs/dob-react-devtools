import { Action, observable, inject } from 'dob'
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
      title: 'test dob-react-devtools',
      author: 'ascoders'
    })
  }

  @Action changeArticleTitle(index: number, title: string) {
    this.ArticleStore.articles[index].title = title

  }

  @Action removeArticle(index: number) {
    this.ArticleStore.articles.splice(index, 1)
  }

  @Action addArticleAndChangeTitle(title: string) {
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
      // Action(() => {
      this.ArticleStore.a.b.c.d = 7
      this.ArticleStore.a.b.c.d = 8
      this.ArticleStore.a.b.c.d = 9
      // })
    })
  }

  @Action runAnonymousTest() {
    this.ArticleStore.a.b.c.d = 7
    Action(() => {
      this.ArticleStore.a.b.c.d = 8
      this.test2()
    })
    this.ArticleStore.a.b.c.d = 9
  }

  @Action test2() {
    this.test3()
  }

  @Action test3() {
    this.test4()
  }

  @Action test4() {
    this.ArticleStore.a.b.c.d = 10
    this.ArticleStore.a.b.c.d = 11
  }
}
