import React from 'react';
import ContentLoader from 'react-content-loader';

const ProfileSkeleton = (props) => (
  <ContentLoader
    speed={2}
    width={1410}
    height={770}
    viewBox="0 0 1410 770"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <rect x="0" y="0" rx="15" ry="15" width="240" height="27" />
    <rect x="0" y="40" rx="15" ry="15" width="230" height="20" />
    <rect x="0" y="80" rx="5" ry="5" width="100" height="50" />
    <rect x="560" y="60" rx="10" ry="10" width="840" height="600" />
    <rect x="870" y="0" rx="15" ry="15" width="240" height="27" />
  </ContentLoader>
);

export default ProfileSkeleton;
