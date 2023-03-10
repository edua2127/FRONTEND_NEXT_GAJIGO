import { AbstractLinks } from '@/types/abstract-links.type'
import { ApiLink } from '@/types/api-link.types'
import { CollectionResource } from '@/types/collection-resource.types'
import { AbstractEntity } from '@/types/abstract-entity.types'

interface IRoom {
  id: number
  name: string
  description: string
  lectures: []
}

export class Room implements AbstractEntity {
  id!: number
  name!: string
  description!: string
  event!: string
  active!: boolean
  _links!: RoomLinks
  lectures!: []
}

export interface RoomCollectionResource extends CollectionResource<Room> {
  _embedded: {
    rooms: Room[]
  }
}

export interface RoomLinks extends AbstractLinks {
  rooms: ApiLink
}
