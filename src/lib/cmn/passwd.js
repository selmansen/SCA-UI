export const generatePassword = function (limit) {
  limit = 8 || parseInt(limit)
  let password = ''
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

  const list = chars.split('')
  const len = list.length
  let i = 0

  do {
    i++
    const index = Math.floor(Math.random() * len)
    password += list[index]
  } while (i < limit)

  return password
}
