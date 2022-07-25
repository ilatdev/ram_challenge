import axios from 'axios'
import { IresponseShape, Tcollections } from '../types'

interface api_config {
  url: string
  pages: number
}

interface RAM_API_Type {
  [index: string]: api_config
}

const RAM_API: RAM_API_Type = {
  characters: { url: 'https://rickandmortyapi.com/api/character', pages: 42 },
  locations: { url: 'https://rickandmortyapi.com/api/location', pages: 7 },
  episodes: { url: 'https://rickandmortyapi.com/api/episode', pages: 3 }
}

/**
 * It takes an array of strings as an argument, and returns an object with the same keys as the array,
 * but with the values being the data from the API
 * @param {Tcollections} collections - Tcollections
 * @returns An object with the following shape:
 * {
 *   characters: [],
 *   locations: [],
 *   episodes: []
 * }
 */
const fetchData = async function (collections: Tcollections) {
  let data = <IresponseShape>{}

  const promisesCollections = collections.reduce((acum: any, current) => {
    let subGroup = []
    for (let k = 1; k <= RAM_API[current].pages; k++) {
      subGroup.push(
        axios
          .get(`${RAM_API[current].url}?page=${k}`)
          .then(({ data }) => data.results)
      )
    }
    return [...acum, Promise.all(subGroup)]
  }, [])

  await Promise.all(promisesCollections).then((resArray) =>
    resArray.map((item, index) => (data[collections[index]] = item.flat()))
  )

  return data
}

export default fetchData
