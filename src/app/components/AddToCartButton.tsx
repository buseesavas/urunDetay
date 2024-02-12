import React from 'react';

 interface AddToCartButtonProps {
   isDisabled: boolean;
   handleAddToCart: () => void;
 }
 
 const AddToCartButton: React.FC<AddToCartButtonProps> = ({ isDisabled, handleAddToCart }) => {
   const handleClick: React.MouseEventHandler<HTMLButtonElement> | undefined = isDisabled ? undefined : (e) => {
     handleAddToCart();
     console.log('Sepete eklendi!');
   };
 
   return (
     <button
       className={`px-7 py-3 m-14 text-lg ${isDisabled ? 'bg-gray-300 cursor-not-allowed' : 'bg-amber-400 hover:bg-amber-500 active:bg-amber-600'} focus:outline-none focus:ring focus:ring-amber-300 rounded-full`}
       onClick={handleClick}
       disabled={isDisabled}
     >
       Sepete Ekle
     </button>
   );
 };
 
 export default AddToCartButton;   


