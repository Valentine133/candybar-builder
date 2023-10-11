'use client';
import React, { useCallback, useState } from 'react';
import axios from 'axios';
import { signIn } from 'next-auth/react';

import { Input } from '@/shared/ui/inputs/form-input';
import { Button } from '@/shared/ui/buttons/simple-btn';

import { FcGoogle } from 'react-icons/fc';

export const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [variant, setVariant] = useState('login');

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === 'login' ? 'register' : 'login',
    );
  }, []);

  const login = useCallback(async () => {
    try {
      await signIn('credentials', {
        email,
        password,
        callbackUrl: '/profile',
      });
    } catch (err) {
      console.log(err);
    }
  }, [email, password]);

  const register = useCallback(async () => {
    try {
      await axios.post('/api/register', {
        email,
        name,
        password
      })

      login();
    } catch (err) {
      console.log(err);
    }
  }, [email, name, password, login]);

  return (
    <div className="bg-white px-6 md:px-16 py-10 self-center rounded-xl w-4/5 lg:w-2/5 lg:max-w-md shadow-md">
      <h2 className="text-center text-3xl mb-8 font-semibold">
        {variant === 'login' ? 'Sign In' : 'Register'}
      </h2>
      {variant === 'register' && (
        <Input
          id="user-name"
          type="text"
          value={name}
          label="User Name"
          onChange={(ev: any) => setName(ev.target.value)}
        />
      )}
      <Input
        id="email"
        type="email"
        value={email}
        label="Email"
        onChange={(ev: any) => setEmail(ev.target.value)}
      />
      <Input
        id="password"
        type="password"
        value={password}
        label="Password"
        onChange={(ev: any) => setPassword(ev.target.value)}
      />
      <Button
        type="submit"
        label={variant === 'login' ? 'Login' : 'Sign Up'}
        style="primary"
        width="full"
        onClick={variant === 'login' ? login : register}
      />

      <p className="mt-10 text-md text-gray-500">
        {variant === 'login'
          ? 'First time on the site?'
          : 'Already have an account?'}
        <span
          onClick={() => toggleVariant()}
          className="ml-1 text-black text-md hover:underline cursor-pointer"
        >
          {variant === 'login' ? 'Creat an account' : 'Login'}
        </span>
      </p>

      <p className="my-3 flex md:w-full items-center before:content-[''] before:w-full before:h-1 before:border-b before:border-gray-200 before:border-1 before:mx-6 xl:before:mx-10 dark:before:border-gray-700 after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
        <span className="flex items-center">
          or
        </span>
      </p>

      <Button
        icon={<FcGoogle size="30" />}
        label="Continue with Google"
        style="default"
        width="full"
        customClass="mt-4"
        onClick={() => signIn('google', {callbackUrl: '/profile'})}
      />
    </div>
  );
};
