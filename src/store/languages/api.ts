import { Language } from '@/types/language.types'
import {
  injectGetById,
  injectGetByUrl,
  injectGetAll,
  injectCreate,
  injectUpdate,
  injectDelete,
} from '../api'

const endpoint = 'languages'

export const { useGetLanguageByIdQuery } = injectGetById<Language>('getLanguageById', endpoint)
export const { useGetLanguageByUrlQuery } = injectGetByUrl<Language>('getLanguageByUrl')
export const { useListLanguagesQuery } = injectGetAll<Language>('listLanguages', endpoint)
export const { useCreateLanguageMutation } = injectCreate<Language>('createLanguage', endpoint)
export const { useUpdateLanguageMutation } = injectUpdate<Language>('updateLanguage', endpoint)
export const { useDeleteLanguageMutation } = injectDelete('deleteLanguage', endpoint)
