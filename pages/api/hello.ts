// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {getDbConnection} from './utils/getDbConnection'
type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let {connection} = await getDbConnection()
  res.status(200).json({ name: 'John Doe' })
}
