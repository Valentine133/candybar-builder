'use client'

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { closeAllModals } from '@/shared/lib/redux/slices/modalSlice';


export default function CloseModalsOnRouteChange() {
  const pathname = usePathname();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(closeAllModals());
  }, [pathname, dispatch]);

  return null;
}
