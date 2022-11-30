import { AbstractLinks } from '@/types/abstract-links.type'
import { ApiLink } from '@/types/api-link.types'

import { CollectionResource } from '@/types/collection-resource.types'
import { AbstractEntity } from '@/types/abstract-entity.types'

export class Language implements AbstractEntity {
  id!: number
  created!: Date
  updated!: Date
  removed!: Date
  name!: string
  active!: boolean
  _links!: LanguageLinks
}

export interface LanguageCollection extends CollectionResource<Language> {
  _embedded: {
    languages: Language[]
  }
}

export interface LanguageLinks extends AbstractLinks {
  self: ApiLink
}
