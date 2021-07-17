import React from 'react';
import ContentLoader from 'react-content-loader';

function OrdersSkeleton(props) {
  return (
    <ContentLoader
      width={950}
      height={470}
      viewBox="0 0 950 455"
      backgroundColor="#f5f5f5"
      foregroundColor="#dbdbdb"
      {...props}>
      <rect x="4" y="8" rx="3" ry="3" width="8" height="455" />
      <rect x="7" y="450" rx="3" ry="3" width="930" height="8" />
      <rect x="930" y="9" rx="3" ry="3" width="7" height="455" />
      <rect x="5" y="8" rx="3" ry="3" width="930" height="7" />
      <rect x="114" y="52" rx="6" ry="6" width="800" height="15" />
      <circle cx="77" cy="60" r="15" />
      <rect x="116" y="105" rx="6" ry="6" width="800" height="15" />
      <circle cx="78" cy="113" r="15" />
      <rect x="115" y="158" rx="6" ry="6" width="800" height="15" />
      <circle cx="78" cy="166" r="15" />
      <rect x="117" y="211" rx="6" ry="6" width="800" height="15" />
      <circle cx="79" cy="219" r="15" />
      <rect x="117" y="263" rx="6" ry="6" width="800" height="15" />
      <circle cx="80" cy="271" r="15" />
      <rect x="117" y="315" rx="6" ry="6" width="800" height="15" />
      <circle cx="80" cy="320" r="15" />
      <rect x="117" y="367" rx="6" ry="6" width="800" height="15" />
      <circle cx="80" cy="372" r="15" />
      <rect x="117" y="419" rx="6" ry="6" width="800" height="15" />
      <circle cx="80" cy="424" r="15" />
    </ContentLoader>
  );
}

export default OrdersSkeleton;
