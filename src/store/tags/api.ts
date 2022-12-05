import { Tag } from '@/types/tag.types'
import {
  injectGetById,
  injectGetByUrl,
  injectGetAll,
  injectCreate,
  injectUpdate,
  injectDelete,
} from '../api'

const endpoint = 'tags'

export const { useGetTagByIdQuery } = injectGetById<Tag>('getTagById', endpoint)
export const { useGetTagByUrlQuery } = injectGetByUrl<Tag>('getTagByUrl')
export const { useListTagsQuery } = injectGetAll<Tag>('listTags', endpoint)
export const { useCreateTagMutation } = injectCreate<Tag>('createTag', endpoint)
export const { useUpdateTagMutation } = injectUpdate<Tag>('updateTag', endpoint)
export const { useDeleteTagMutation } = injectDelete('deleteTag', endpoint)
