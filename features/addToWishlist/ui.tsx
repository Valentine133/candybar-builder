import React, { useCallback, useMemo, FC} from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import useCurrentUser from '@/shared/hooks/useCurrentUser';
import useWishlist from '@/shared/hooks/useWishlist';

import { MdFavoriteBorder, MdFavorite } from 'react-icons/md';

interface WishButtonProps {
  productId: string;
}

export const WishButton: FC<WishButtonProps> = ({productId}) => {
  const router = useRouter();

  const { mutate: mutateWishlist } = useWishlist();
  const { data: currentUser, mutate} = useCurrentUser();

  const isWish = useMemo(() => {
    const list = currentUser?.wishlistIds || [];

    return list.includes(productId);
  }, [currentUser, productId]);

  const toggleWish = useCallback(async () => {
    let response;

    if (!currentUser) {
      router.push('/auth');
      return;
    }

    if (isWish) {
      response = await axios.delete('api/wish', {data: {productId}});
    } else {
      response = await axios.post('api/wish', { productId });
    }

    const updateWishlistIds = response?.data?.wishlistIds;

    mutate({
      ...currentUser,
      wishlistIds: updateWishlistIds,
    });

    mutateWishlist();
  }, [currentUser, productId, isWish, mutate, mutateWishlist]);

  const Icon = isWish ? MdFavorite : MdFavoriteBorder;

  return (
    <div
      className="flex items-center justify-center p-1 cursor-pointer h-10 w-10 text-primary rounded-full bg-purple-100 hover:bg-purple-200 hover:text-white transition"
      onClick={() => toggleWish()}
    >
      <Icon className="text-primary" size={24} />
    </div>
  );
}
