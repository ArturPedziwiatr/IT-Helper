import { get } from 'lodash'

export default function haveSameFields(...obj: object[]): boolean {
  if (obj.length < 2) return true
  const [first, ...rest] = obj
  if (Object.keys(first).length !== Object.keys(rest[0]).length) return false
  for (const key in first) {
    const filed = get(first, key)
    if (typeof filed === 'object') {
      if (!haveSameFields(filed, ...rest.map(o => get(o, key)))) return false
    }
  }
  return true
}