import React from 'react';
import ContentLoader from 'react-content-loader';

export const SkeletonProduct: React.FC = ({ ...props }) => (
  <ContentLoader
    speed={3}
    width="100%"
    height="auto"
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="2" y="298" rx="3" ry="3" width="410" height="21" />
    <rect x="2" y="268" rx="3" ry="3" width="380" height="18" />
    <rect x="3" y="393" rx="3" ry="3" width="80" height="30" />
    <rect x="2" y="-1" rx="0" ry="0" width="275" height="254" />
    <rect x="199" y="392" rx="3" ry="3" width="80" height="30" />
  </ContentLoader>
);
