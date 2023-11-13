import { NextApiRequest, NextApiResponse } from "next";

import prismadb from '@/shared/lib/prisma/prismadb';
import serverAuth from "@/shared/lib/serverAuth/serverAuth";

export default async function hendler(req: NextApiRequest, res: NextApiResponse) {
  try { 
    if (req.method !== 'GET') {
      return res.status(405).end();
    }
  
    const { currentUser } = await serverAuth(req, res);

    const wishProducts = await prismadb.product.findMany({
      where: {
        id: {
          in: currentUser?.wishlistIds,
        }
      }
    });

    return res.status(200).json(wishProducts);
  } catch (err) {
    return res.status(500).end();
  }
};