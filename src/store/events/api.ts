import { Event } from '@/types/event.types'
import {
  injectGetById,
  injectGetByUrl,
  injectGetAll,
  injectCreate,
  injectUpdate,
  injectDelete,
} from '../api'

const endpoint = 'events'

export const { useGetEventByIdQuery } = injectGetById<Event>('getEventById', endpoint)
export const { useGetEventByUrlQuery } = injectGetByUrl<Event>('getEventByUrl', endpoint)
export const { useListEventsQuery } = injectGetAll<Event>('listEvents', endpoint)
export const { useCreateEventMutation } = injectCreate<Event>('createEvent', endpoint)
export const { useUpdateEventMutation } = injectUpdate<Event>('updateEvent', endpoint)
export const { useDeleteEventMutation } = injectDelete('deleteEvent', endpoint)
