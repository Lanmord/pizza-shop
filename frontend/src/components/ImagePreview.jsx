import React from 'react';

function ImagePreview({ image, baseImg }) {
  const [preview, setPreview] = React.useState(baseImg);
  React.useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(image);
    } else {
      setPreview(baseImg);
    }
  }, [image]);
  return <img src={preview} />;
}

export default ImagePreview;
