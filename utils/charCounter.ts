import { IresponseShape, Tcollections } from '../types'

const countCharacter = (arrayData: string[], character: string) =>
  arrayData.reduce((acumulator: number, current: string) => {
    return acumulator + current.toLowerCase().split(character).length - 1
  }, 0)

/**
 * It takes an array of strings and a character, and returns an object with the number of times that
 * character appears in each string
 * @param {IresponseShape} data - IresponseShape - this is the response from the API.
 * @param {Tcollections} collections - an array of strings that represent the collections we want
 * to count characters in.
 * @returns An object with the number of characters, locations, and episodes.
 */
const charCounter = (data: IresponseShape, collections: Tcollections) => {
  const charToCount = { characters: 'c', locations: 'l', episodes: 'e' }

  let counters: any = {}

  for (let i = 0; i < collections.length; i++) {
    const arrayNames: string[] = data[collections[i]].map((el: any) => el.name)
    counters[collections[i]] = countCharacter(
      arrayNames,
      charToCount[collections[i]]
    )
  }

  return counters
}

export default charCounter
