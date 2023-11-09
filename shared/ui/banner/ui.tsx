import React, {FC} from 'react';

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
      className="bg-cover bg-center h-[70vh] text-white flex justify-center py-24 px-10 object-fill rounded-xl"
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
      }}
    >
      <div className="md:w-1/2 flex flex-wrap items-start justify-center">
        <p className="font-bold text-3xl lg:text-5xl text-center uppercase mb-4">
          {title}
        </p>
        <p className="text-xl text-center mb-10 leading-none">{description}</p>
        <Button label={labelBtn} style="primary" as="a" href={link} />
      </div>
    </div>
  );
};
