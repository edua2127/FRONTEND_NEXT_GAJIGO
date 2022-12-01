import { AbstractLinks } from '@/types/abstract-links.type'
import { ApiLink } from '@/types/api-link.types'

import { CollectionResource } from '@/types/collection-resource.types'
import { AbstractEntity } from '@/types/abstract-entity.types'

export class Lecture implements AbstractEntity {
  id!: number
  created!: Date
  updated!: Date
  removed!: Date
  name!: string
  description!: string
  room!: string
  active!: boolean
  _links!: LectureLinks
  event!: string
  language!: string
  tags!: string[]
  interval!: interval
  attendanceMode!: string
  speakers!: string[]
  participants!: string[]
}

export interface interval {
  startDate: string
  endDate: string
}

export interface LectureCollectionResource extends CollectionResource<Lecture> {
  _embedded: {
    lectures: Lecture[]
  }
}

export interface LectureLinks extends AbstractLinks {
  lectures: ApiLink
  participants: ApiLink
}
