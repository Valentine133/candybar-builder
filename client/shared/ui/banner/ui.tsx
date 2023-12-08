import React, {FC} from 'react';
import Link from 'next/link';

import { Button } from '@/shared/ui/buttons/simple-btn';

interface IProps {
  title: string;
  description?: string;
  backgroundImageUrl?: string;
  labelBtn: string;
  link?: string;
}

export const Banner: FC<IProps> = ({ title, description, backgroundImageUrl, labelBtn, link }) => {
  return (
    <div
      className="bg-cover bg-center h-[70vh] flex items-center justify-center py-24 px-10 object-fill"
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
      }}
    >
      <div className="md:w-1/2 flex flex-wrap items-start justify-center">
        <p className="font-bold text-primary text-3xl lg:text-5xl text-center uppercase mb-4">
          {title}
        </p>
        <p className="text-xl text-center text-secondary mb-10 leading-none">
          {description}
        </p>
        <Button style="primary" as={Link} href={link}>
          {labelBtn}
        </Button>
      </div>
    </div>
  );
};
