import { useState, useEffect } from 'react';
import Image from 'next/image';

interface ImageGalleryProps {
  images: string[];
  onImageChange: (image: string) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, onImageChange }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(
    images && images.length > 0 ? images[0] : null
  );

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
    onImageChange(image);
  };

  return (
    <div className="">
      <div className="mb-2 border-2 border-gray-200 rounded-md justify-center ">
        {images && images.length > 0 ? (
          <Image
            src={selectedImage || images[0]}
            alt="Ürün Görseli"
            width={600}
            height={400}
           
          />
        ) : (
          <p>Resim bulunamadı</p>
        )}
      </div>
      <div className="flex flex-row mt-4  ">
        {images.map((image, index) => (
          <Image
            key={index}
            src={image}
            alt={`Thumbnail ${index + 1}`}
            width={120}
            height={80}
            className={`mb-2 cursor-pointer rounded-md  ${
              selectedImage === image
                ? 'bg-white text-black border-2 border-amber-500'
                : 'bg-white text-black border-2 border-grey-200 '
            }`}
            onClick={() => handleImageClick(image)}
            
          />
        ))}
      </div>
    </div>
  );
};


export default ImageGallery;






