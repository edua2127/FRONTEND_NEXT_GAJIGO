import { AbstractClient } from '@/client/abstract.client'
import { Tag, TagCollectionResource } from '@/types/tag.types'

export class TagClient extends AbstractClient<Tag, TagCollectionResource> {
    constructor() {
        super('tags')
    }
}
