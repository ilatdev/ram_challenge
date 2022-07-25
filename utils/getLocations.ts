import { IresponseShape } from '../types'

/**
 * It takes an array of episodes and an array of characters, and returns an array of objects that
 * contain the name of the episode, the episode number, the number of locations, and an array of
 * locations
 * @param {IresponseShape} data - responseShape
 * @returns An array of objects with the following shape:
 * {
 *   name: string,
 *   episode: string,
 *   count: number,
 *   locations: string[]
 * }
 */
const getLocations = (data: IresponseShape) => {
  const episodeList = data.episodes
  const charList = data.characters
  let getLocations = []

  for (let k = 0; k < episodeList.length; k++) {
    const { characters, episode, name } = episodeList[k]

    const characterIds = characters.map((urlCharacter: string) => {
      const temp = urlCharacter.split('/')
      return Number(temp[temp.length - 1])
    })

    let locations = <string[]>[]

    for (let id of characterIds) {
      const locationName = charList[id - 1].location.name
      const isIncluded = locations.includes(locationName)
      !isIncluded && locations.push(locationName)
    }

    getLocations.push({
      name,
      episode,
      count: locations.length,
      locations
    })
  }

  return getLocations
}

export default getLocations
