// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Tcollections } from '../../types'
import charCounter from '../../utils/charCounter'
import fetchData from '../../utils/fetchData'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const collections: Tcollections = ['characters', 'locations', 'episodes']
  const data = await fetchData(collections)
  const counters = charCounter(data, collections)
  res.status(200).send([
    {
      exercise_name: 'Char counter',
      time: 1,
      in_time: true,
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
      time: 1,
      in_time: true,
      results: []
    }
  ])
}
