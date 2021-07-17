import React from 'react';
import ContentLoader from 'react-content-loader';

function LoadingBlock(props) {
  return (
    <ContentLoader
      speed={2}
      width={500}
      height={232}
      viewBox="0 0 500 232"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}>
      <circle cx="97" cy="97" r="97" />
      <rect x="221" y="18" rx="10" ry="10" width="275" height="38" />
      <rect x="221" y="121" rx="29" ry="29" width="273" height="40" />
      <rect x="220" y="72" rx="29" ry="29" width="273" height="40" />
      <rect x="219" y="176" rx="29" ry="29" width="98" height="40" />
      <rect x="358" y="178" rx="5" ry="5" width="137" height="40" />
    </ContentLoader>
  );
}

export default LoadingBlock;
