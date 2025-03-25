import dayjs from 'dayjs'

export const share = (network: string, title: string) => {
  if (process.client) {
    switch (network) {
      case 'telegram':
        window.open(
          `https://t.me/share/url?url=${window.location.href}&text=${title}`,
          '_blank'
        )
        break
      case 'twitter':
        window.open(
          `https://twitter.com/intent/tweet?text=${title}\n+${window.location.href}`,
          '_blank'
        )
        break
      case 'facebook':
        window.open(
          `https://www.facebook.com/sharer/sharer.php?t=${title}\n${window.location.href}`,
          '_blank'
        )
        break
    }
  }
}

export function formatNumberWithSpaces(number: number) {
  const strNumber = number?.toString()

  const parts = strNumber.split('.')
  const integerPart = parts[0]
  const decimalPart = parts[1] ? '.' + parts[1] : ''

  let formattedIntegerPart = ''
  for (let i = integerPart.length - 1, count = 0; i >= 0; i--, count++) {
    formattedIntegerPart = integerPart[i] + formattedIntegerPart
    if (count % 3 === 2 && i > 0) {
      formattedIntegerPart = ' ' + formattedIntegerPart
    }
  }

  return formattedIntegerPart + decimalPart
}

const timeouts: any = {}

const cTimeout = (key = 'key') => {
  if (timeouts[key]) {
    clearTimeout(timeouts[key])
    timeouts[key] = undefined
  }
}

export const debounce = (key = 'key', fn = () => {}, timeout = 500) => {
  const sTimeout = (key: string, fn: Function, timeout: number) => {
    cTimeout(key)

    timeouts[key] = setTimeout(() => {
      try {
        fn()
      } catch (e) {}

      timeouts[key] = undefined
    }, timeout)
  }

  return sTimeout(key, fn, timeout)
}

export const toEmbed = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  if (match && match[2].length === 11) {
    return match[2]
  } else {
    return 'error'
  }
}

const validPhones = new Set([
  '90',
  '91',
  '33',
  '50',
  '93',
  '94',
  '88',
  '95',
  '97',
  '98',
  '99',
  '77',
])
const regPhone = /^([+]?[9]{2}[8][0-9]{2}[0-9]{7})$/
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
export const isValidPhone = (val: string) => {
  const phone = val.replace(/[\s)(-]/g, '')
  return phone.length === 9 && validPhones.has(phone.substring(0, 2))
}
export const validEmail = (val: string) => {
  if (!val) return false
  if (emailRegex.test(val)) return true
  if (!emailRegex.test(val)) return false
}
export const isValidPhoneOrEmail = (val: string) => {
  if (!val) return false
  if (emailRegex.test(val) || regPhone.test(val)) return true
  if (!emailRegex.test(val)) return false
  if (!regPhone.test(val)) return false
}

export const formatPhoneNumber = (phone: string) => {
  return phone.replace(/(\d{3})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4')
}

export function formatMoneyDecimal(number: any, fix = 0, option = 'decimal') {
  let style: string
  if (['USD', 'RUB'].includes(option)) {
    style = 'currency'
  } else if (['kilogram', 'meter', 'percent'].includes(option)) {
    style = 'unit'
  } else {
    style = ''
  }

  const newStyle: string = style
  const option2 = {
    newStyle, //  unit currency percent decimal
    [newStyle]: option,
    maximumFractionDigits: fix,
    minimumFractionDigits: fix,
  }
  return number
    ? new Intl.NumberFormat('ru-RU', option2).format(number)
    : '0,00'
}
export function getTimeText(time: Date) {
  const locale = useCookie('i18n_redirected')
  const now = Date.now()
  const gTime = new Date(time).getTime()
  const diff = now - gTime
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const weeks = Math.floor(days / 7)
  const months = Math.floor(days / 30)
  const years = Math.floor(days / 365)
  if (locale.value === 'uz') {
    if (seconds < 60) {
      return 'bir necha soniya oldin'
    } else if (minutes < 60) {
      return `${minutes} daqiqa oldin`
    } else if (hours < 24) {
      return `${hours} soat oldin`
    } else if (days < 7) {
      return `${days} kun oldin`
    } else if (weeks < 4) {
      return `${weeks} hafta oldin`
    } else if (months < 12) {
      return `${months} oy oldin`
    } else {
      return `${years} yil oldin`
    }
  } else {
    return dayjs(time).fromNow()
  }
}
export function formatNumber(number: string | number) {
  return number && number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}
export function getSevenDaysBeforeToday() {
  const today = new Date() // Get the current date
  const sevenDaysBefore = new Date(today) // Create a new Date object with the same date as today

  sevenDaysBefore.setDate(today.getDate() - 7) // Subtract 7 days from the current date

  return dayjs(sevenDaysBefore).format('YYYY-MM-DD') // Output the result in the given format
}

export function updateQueries(name: string, value: string) {
  const route = useRoute()
  const router = useRouter()
  const queries = {
    ...route.query,
    [name]: value,
  }
  router.replace({ query: queries })
}

export function countElementsInString(inputString: string): number {
  return inputString.length
}

export function generateUniqueId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}
