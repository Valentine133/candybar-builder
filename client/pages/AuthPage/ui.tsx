import { AuthForm } from '@/widgets/auth-form';

export const AuthPage = () => {
  return (
    <div className="relative h-screen w-full bg-[url('/images/auth-bg.jpg')] bg-no-repeat bg-cover bg-fixed">
      <div className="flex justify-center items-center h-full">
        <AuthForm />
      </div>
    </div>
  );
};
