/**
 * It takes a number of milliseconds and returns an object with a formatted time string and a boolean
 * indicating whether the time is less than 3 seconds
 * @param {number} time - number - The time in milliseconds
 * @returns An object with two properties: time and inTime.
 */
const formatTime = (time: number) => {
  const inTime = time < 3000
  const ms = time % 1000
  const s = (time - ms) / 1000

  return { time: `${s}s ${ms.toFixed(4)}ms`, inTime }
}

export default formatTime
