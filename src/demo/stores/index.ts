import { combineStores, inject } from 'dob';

import { ArticleAction } from './article/action'
import { ArticleStore } from './article/store'

export const stores = combineStores({
  ArticleAction,
  ArticleStore
})

type IPartial<T> = {
  [P in keyof T]?: T[P]
}

export type IStores = IPartial<typeof stores>