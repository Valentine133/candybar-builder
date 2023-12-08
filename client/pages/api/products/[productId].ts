import { NextApiRequest, NextApiResponse } from "next";
import prismadb from '@/shared/lib/prisma/prismadb';
import serverAuth from "@/shared/lib/serverAuth/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).end();
    }

    await serverAuth(req, res);

    const { productId } = req.query;

    if (typeof productId !== 'string') {
      throw new Error('Invalid Id');
    }

    if (!productId) {
      throw new Error('Missing Id');
    }

    const products = await prismadb.product.findUnique({
      where: {
        id: productId
      }
    });

    return res.status(200).json(products);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}