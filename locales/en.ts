import { CONFIG } from '@/config'

export default async () => {
  const data = await fetch(
    `${CONFIG.BASE_URL}front-translation/FrontTranslationList/?lang=en`
  )
  return await data.json()
}
