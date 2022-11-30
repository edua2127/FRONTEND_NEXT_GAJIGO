import { AbstractLinks } from '@/types/abstract-links.type'
import { ApiLink } from '@/types/api-link.types'

import { CollectionResource } from '@/types/collection-resource.types'
import { AbstractEntity } from '@/types/abstract-entity.types'

export class Lecture implements AbstractEntity {
    id!: number
    created!: Date
    updated!: Date
    removed!: Date
    name: string
    description: string
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
    constructor() {
        this.created = new Date()
        this.updated = new Date()
        this.removed = new Date()
        this.name = ''
        this.description = ''
        this.room = ''
        this.event = ''
        this.language = ''
        this.tags = []
        this.interval = {
            startDate: '',
            endDate: '',
        }
        this.attendanceMode = ''
        this.speakers = []
        this.participants = []
    }
}

export interface interval {
    startDate: string
    endDate: string
}

export interface LectureCollectionResource extends CollectionResource<Lecture> {
    _embedded: {
        palestras: Lecture[]
    }
}

export interface LectureLinks extends AbstractLinks {
    palestras: ApiLink
}
