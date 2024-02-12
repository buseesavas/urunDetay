// pages/index.js
"use client"
import Head from 'next/head';
import { useState } from 'react';
import ImageGallery from './components/ImageGallery';
import Options, { OptionsAttribute } from './components/Options';
import PriceQuantityInput from './components/PriceQuantityInput';
import data from './data.json';
import Header from './Header';


export default function Home() {
  const product = data;
  const [selectedAttribute, setSelectedAttribute] = useState(
    product.selectableAttributes.length > 0 && product.selectableAttributes[0].values.length > 0
      ? product.selectableAttributes[0].values[0]
      : null
  );
  const [selectedImage, setSelectedImage] = useState(
    product.productVariants && product.productVariants.length > 0 &&
      product.productVariants[0].images && product.productVariants[0].images.length > 0
      ? product.productVariants[0].images[0]
      : null
  );

  const handleValueSelect = (value: OptionsAttribute) => {
    setSelectedAttribute(value.values[0]);
  
    const selectedVariant = product.productVariants.find(
      (variant) =>
        variant.attributes.some(
          (attr) => attr.value === selectedAttribute
        )
    );
  
    if (selectedVariant) {
      const newImage = selectedVariant.images && selectedVariant.images.length > 0
        ? selectedVariant.images[0]
        : null;
      setSelectedImage(newImage); 
    }
  };


  const handleImageChange = (image: string) => {
    setSelectedImage(image);
  };

  const selectedVariant = product.productVariants.find(
    (variant) =>
      variant.attributes.some(
        (attr) => attr.value === selectedAttribute
      )
  );
  console.log('Selected Variant:', selectedVariant);

  const selectedImages = selectedVariant ? selectedVariant.images : [];

  return (
    <div className="container">
      <div>
        <Head>
          <title>Ürün detay Sayfası</title>
        </Head>
        <Header />
      </div>

      <div className='flex flex-col md:flex-row mt-1 md:mt-10 justify-center'>
        <div>
          <ImageGallery images={selectedImages} onImageChange={handleImageChange} />
        </div>
        <div className="ml-20 md:ml-40 mt-10">
          <h1 className="text-xl font-medium mb-10">{product.productTitle}</h1>
          <Options
  attributes={product.selectableAttributes as OptionsAttribute[]}
  onValueSelect={handleValueSelect}
/>
          <PriceQuantityInput baremList={product.baremList} product={data} />
        </div>
      </div>
    </div>
  );
}




