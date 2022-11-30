import { Lecture } from '@/types/lecture.types'
import {
  injectGetById,
  injectGetByUrl,
  injectGetAll,
  injectCreate,
  injectUpdate,
  injectDelete,
} from '../api'

const endpoint = 'lectures'

export const { useGetLectureByIdQuery } = injectGetById<Lecture>('getLectureById', endpoint)
export const { useGetLectureByUrlQuery } = injectGetByUrl<Lecture>('getLectureByUrl', endpoint)
export const { useListLecturesQuery } = injectGetAll<Lecture>('listLectures', endpoint)
export const { useCreateLectureMutation } = injectCreate<Lecture>('createLecture', endpoint)
export const { useUpdateLectureMutation } = injectUpdate<Lecture>('updateLecture', endpoint)
export const { useDeleteLectureMutation } = injectDelete('deleteLecture', endpoint)
