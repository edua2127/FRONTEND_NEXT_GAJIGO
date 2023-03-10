import { AbstractLinks } from './abstract-links.type'
import { ApiLink } from '@/types/api-link.types'
import { CollectionResource } from '@/types/collection-resource.types'
import { AbstractEntity } from '@/types/abstract-entity.types'

export class User implements AbstractEntity {
  id!: number
  created!: Date
  updated!: Date
  removed!: Date
  name!: string
  email!: string
  username!: string
  password!: string
  _links!: UserLinks
  active!: boolean
  description!: string
  events!: []
  documents!: []
  admin!: boolean
  organizes!: []
  telephone!: string
  participatesIn!: []
  speaksIn!: []
  authorities!: autorities[]
  location!: string
}

export interface autorities {
  authority: string
}

export interface UserCollection extends CollectionResource<User> {
  // Tentei setar dinamicamente jogando uma variavel "nomeRecurso" em AbstractEntity
  // porem tem que ser manual mesmo, foda.
  _embedded: {
    users: User[]
  }
}

interface UserLinks extends AbstractLinks {
  passwords: ApiLink
}
