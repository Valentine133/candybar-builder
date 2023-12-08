import { NextApiRequest, NextApiResponse } from "next";
import { without } from 'lodash';

import prismadb from '@/shared/lib/prisma/prismadb';
import serverAuth from "@/shared/lib/serverAuth/serverAuth";

export default async function hendler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'POST') {
      const { currentUser } = await serverAuth(req, res);

      const {productId} = req.body;

      const existingProduct = await prismadb.product.findUnique({
        where: { id: productId }
      });

      if (!existingProduct) {
        throw new Error('Invalid ID');
      }

      const user = await prismadb.user.update({
        where: { 
          email: currentUser.email || '',
        },
        data: {
          wishlistIds: {
            push: productId,
          }
        }
      });

      return res.status(200).json(user);
    }

    if (req.method === 'DELETE') {
      const { currentUser } = await serverAuth(req, res);

      const {productId} = req.body;

      const existingProduct = await prismadb.product.findUnique({
        where: { id: productId }
      });

      if (!existingProduct) {
        throw new Error('Invalid ID');
      }

      const updateWishlistIds = without(currentUser.wishlistIds, productId);

      const updateUser = await prismadb.user.update({
        where: {
          email: currentUser.email || '',
        },
        data: {
          wishlistIds: updateWishlistIds,
        }
      });

      return res.status(200).json(updateUser);
    }

    return res.status(405).end();
  } catch (err) {
    return res.status(500).end();
  }
}