import { AbstractService } from '@/services/abstract.service'
import { LanguageClient } from '@/client/language.client'
import { Language, LanguageCollection } from '@/types/language.types'

class LanguageService extends AbstractService<Language, LanguageCollection> {
  constructor() {
    super(new LanguageClient())
  }
}

export default new LanguageService()
