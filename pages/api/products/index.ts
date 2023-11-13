import { NextApiRequest, NextApiResponse } from "next";

import prismadb from '@/shared/lib/prisma/prismadb';
import serverAuth from "@/shared/lib/serverAuth/serverAuth";

export default async function getAllProducts (req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).end();
    }

    await serverAuth(req, res);

    const products = await prismadb.product.findMany();

    return res.status(200).json(products);
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  }
}