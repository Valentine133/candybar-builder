import { NextApiRequest, NextApiResponse } from "next";

import serverAuth from "@/shared/lib/serverAuth/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).end();
    }

    const { currentUser } = await serverAuth(req, res);

    return res.status(200).json(currentUser);
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  }
}