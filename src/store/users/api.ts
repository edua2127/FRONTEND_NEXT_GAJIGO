import { User } from '@/types/user.types'
import {
  injectGetById,
  injectGetByUrl,
  injectGetAll,
  injectCreate,
  injectUpdate,
  injectDelete,
} from '../api'

const endpoint = 'users'

export const { useGetUserByIdQuery } = injectGetById<User>('getUserById', endpoint)
export const { useGetUserByUrlQuery } = injectGetByUrl<User>('getUserByUrl')
export const { useListUsersQuery } = injectGetAll<User>('listUsers', endpoint)
export const { useCreateUserMutation } = injectCreate<User>('createUser', endpoint)
export const { useUpdateUserMutation } = injectUpdate<User>('updateUser', endpoint)
export const { useDeleteUserMutation } = injectDelete('deleteUser', endpoint)
