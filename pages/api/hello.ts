// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {getSession} from "next-auth/client";

type Data = {
  name: string
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  const session = await getSession({ req })
  console.log(session)
  /*let {connection} = await getDbConnection()

  let phoneRepo = connection.getRepository(PhoneEntity)

  let phone = new PhoneEntity()
  phone.name = "Iphone"
  phone.color = "black"

  await phoneRepo.save(phone)*/

  res.status(200).json({ name: 'John Doe' })
}
