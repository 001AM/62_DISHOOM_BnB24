import React from 'react';
import { getFullUrl } from './utils';

function MyComponent() {
  const imageUrl = '/images/myimage.jpg';
  const linkUrl = '/pages/mypage';

  return (
    <div>
      <img src={getFullUrl(imageUrl)} alt="My Image" />
      <a href={getFullUrl(linkUrl)}>My Page</a>
    </div>
  );
}

export default MyComponent;
