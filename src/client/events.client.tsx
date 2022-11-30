import { AbstractClient } from '@/client/abstract.client'
import { Event, EventCollectionResource } from '@/types/event.types'

export class EventClient extends AbstractClient<Event, EventCollectionResource> {
  constructor() {
    super('events')
  }
}
