import { AbstractLinks } from '@/types/abstract-links.type'
import { ApiLink } from '@/types/api-link.types'

import { CollectionResource } from '@/types/collection-resource.types'
import { AbstractEntity } from '@/types/abstract-entity.types'

export class Tag implements AbstractEntity {
    id!: number
    created!: Date
    updated!: Date
    removed!: Date
    name: string
    description: string
    _links!: TagLinks
    active!: boolean
    taggedLectures!: string[]
    constructor() {
        this.name = ''
        this.description = ''
        this.active = true
        this.created = new Date()
        this.updated = new Date()
        this.removed = new Date()
        this.taggedLectures = []
    }
}

export interface TagCollectionResource extends CollectionResource<Tag> {
    _embedded: {
        tags: Tag[]
    }
}

export interface TagLinks extends AbstractLinks {
    tags: ApiLink
}
