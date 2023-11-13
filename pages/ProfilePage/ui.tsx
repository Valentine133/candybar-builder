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
    <div className="profile-page">
      <section className="relative block h-[300px]">
        <div
          className="absolute top-0 w-full h-full bg-center bg-cover"
          style={{
            backgroundImage: `url('images/auth-bg.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
          }}
        >
          <span
            id="blackOverlay"
            className="w-full h-full absolute opacity-30 bg-black"
          ></span>
        </div>
      </section>
      <section className="relative py-16">
        <div className="container mx-auto px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-40">
            <div className="p-4 md:p-6">
              <div className="flex flex-wrap justify-center">
                <img
                  alt={user?.name}
                  src={user?.image}
                  className="shadow-xl rounded-full h-24 w-24 -mt-16 bg-slate-500 align-middle border-2"
                />
              </div>
              <div className="text-center mt-8">
                <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700">
                  {user?.name}
                </h3>
                <div className="text-sm leading-normal mt-0 mb-2 font-bold uppercase">
                  {user?.email}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
