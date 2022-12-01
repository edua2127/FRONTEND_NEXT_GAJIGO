import { Room } from '@/types/room.types'
import {
  injectGetById,
  injectGetByUrl,
  injectGetAll,
  injectCreate,
  injectUpdate,
  injectDelete,
} from '../api'

const endpoint = 'rooms'

export const { useGetRoomByIdQuery } = injectGetById<Room>('getRoomById', endpoint)
export const { useGetRoomByUrlQuery } = injectGetByUrl<Room>('getRoomByUrl')
export const { useListRoomsQuery } = injectGetAll<Room>('listRooms', endpoint)
export const { useCreateRoomMutation } = injectCreate<Room>('createRoom', endpoint)
export const { useUpdateRoomMutation } = injectUpdate<Room>('updateRoom', endpoint)
export const { useDeleteRoomMutation } = injectDelete('deleteRoom', endpoint)
