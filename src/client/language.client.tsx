import { AbstractClient } from '@/client/abstract.client'
import { Language, LanguageCollection } from '@/types/language.types'

export class LanguageClient extends AbstractClient<Language, LanguageCollection> {
  constructor() {
    super('languages')
  }
}
