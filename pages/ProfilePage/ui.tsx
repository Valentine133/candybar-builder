'use client'
import React from 'react';
import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';

import useCurrentUser from '@/shared/hooks/useCurrentUser';

// Don't work redirection on the Auth page if you are not authenticated
export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}

export const ProfilePage = () => {
  const {data: user} = useCurrentUser();

  return (
    <div className="">
      <h1>ProfilePage</h1>
      <p>{user?.image}</p>
      <p>{user?.name}</p>
      <p>{user?.email}</p>
    </div>
  );
};
