import React, { useState, ChangeEvent } from 'react';
import AddToCartButton from './AddToCartButton';

interface Attribute {
  name: string;
  value: string;
}

interface PriceQuantityInputProps {
  baremList: { minimumQuantity: number; maximumQuantity: number; price: number }[];
  // product prop'unu isteğe bağlı yap veya kaldır
  product?: {
    productVariants: { attributes: { name: string; value: string }[] }[];
    // Diğer product özellikleri buraya ekleyebilirsiniz
  };
}

const PriceQuantityInput: React.FC<PriceQuantityInputProps> = ({ baremList, product }) => {
  const [quantity, setQuantity] = useState<string>('');
  const [selectedAttribute, setSelectedAttribute] = useState<{ name: string; value: string } | null>(null);

  const handleQuantityChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newQuantity = event.target.value;
    setQuantity(newQuantity);

    const newSelectedAttribute = getSelectedAttributeFromEvent(event);
    setSelectedAttribute(newSelectedAttribute);
  };

  const calculatePrice = (): string => {
    const parsedQuantity = parseInt(quantity, 10) || 0;
    let calculatedPrice = 0;

    for (const barem of baremList) {
      if (parsedQuantity >= barem.minimumQuantity && parsedQuantity <= barem.maximumQuantity) {
        calculatedPrice = barem.price * parsedQuantity;
        break;
      }
    }

    return calculatedPrice.toFixed(2);
  };

  const handleAddToCart = (): void => {
    const selectedVariant = getSelectedVariant(selectedAttribute);

    if (selectedVariant) {
      const selectedColor = selectedVariant.attributes.find((attr: Attribute) => attr.name === 'Renk');
      const selectedSize = selectedVariant.attributes.find((attr: Attribute) => attr.name === 'Beden');

      console.log('Sepete Eklenen Ürün Bilgileri:');
      console.log('Renk:', selectedColor);
      console.log('Beden:', selectedSize);
      console.log('Fiyat:', calculatePrice());
    } else {
      console.error('Ürün bilgileri alınamadı. Lütfen geçerli bir adet giriniz.');
    }
  };

  const getSelectedAttributeFromEvent = (event: ChangeEvent<HTMLInputElement>) => {
    const attributeName = event.target.name;
    const attributeValue = event.target.value;

    return { name: attributeName, value: attributeValue };
  };

  const getSelectedVariant = (selectedAttribute: { name: string; value: string } | null) => {
    if (!product || !product.productVariants || product.productVariants.length === 0) {
      return null;
    }
  
    const selectedVariant = product.productVariants.find((variant) =>
      variant.attributes.some(
        (attr) => attr.name === selectedAttribute?.name && attr.value === selectedAttribute?.value
      )
    );
  
    return selectedVariant || null;
  };
  

  return (
    <div className="mb-4">
      <p className="font-semibold">Toptan Fiyat/Adet Barem Aralığı</p>
      <div>
        {baremList.map((barem, index) => (
          <div key={index}>
            {barem.minimumQuantity} - {barem.maximumQuantity} Adet: {barem.price} TL
          </div>
        ))}
      </div>
      <label className="block mt-2">Adet:</label>
      <input
        type="tel"
        pattern="[0-9]*"
        className="border p-1"
        value={quantity}
        onChange={handleQuantityChange}
      />
      <div>
        <p className="font-semibold mt-2">Toplam Fiyat:</p>
        <p>{calculatePrice()} TL</p>
      </div>
      <AddToCartButton handleAddToCart={handleAddToCart} isDisabled={quantity === '' || calculatePrice() === '0.00'} />
    </div>
  );
};

export default PriceQuantityInput;











  