export const second = 1000

export const minutes = time => time * 1000

export const readingTime = (text, readingSpeed = 250) => {
  const words = text.split(' ').length
  const readingTime = words / readingSpeed

  return readingTime * 60 * 1000
}
