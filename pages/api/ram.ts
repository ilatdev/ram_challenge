// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Tcollections } from '../../types'
import charCounter from '../../utils/charCounter'
import fetchData from '../../utils/fetchData'
import formatTime from '../../utils/formatTime'
import getLocations from '../../utils/getLocations'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const start = performance.now()

  const collections: Tcollections = ['characters', 'locations', 'episodes']
  const data = await fetchData(collections)
  const counters = charCounter(data, collections)
  const locations = getLocations(data)

  const end = performance.now() - start

  res.status(200).json([
    {
      exercise_name: 'Char counter',
      time: formatTime(end).time,
      in_time: formatTime(end).inTime,
      results: [
        {
          char: 'l',
          count: counters.locations,
          resource: 'location'
        },
        {
          char: 'e',
          count: counters.episodes,
          resource: 'episode'
        },
        {
          char: 'c',
          count: counters.characters,
          resource: 'character'
        }
      ]
    },
    {
      exercise_name: 'Episode locations',
      time: formatTime(end).time,
      in_time: formatTime(end).inTime,
      results: locations
    }
  ])
}
