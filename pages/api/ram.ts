// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import fetchData from '../../utils/fetchData'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = await fetchData(['characters', 'locations', 'episodes'])
  res.status(200).send(data)
}
