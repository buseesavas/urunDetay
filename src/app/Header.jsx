import { IoSearch } from "react-icons/io5";
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { AiOutlineUser } from "react-icons/ai";
import { VscHeart } from "react-icons/vsc";
import { RxHamburgerMenu } from "react-icons/rx";

const Header = () => {
  return (
    <nav className='bg-black text-white flex items-center justify-between gap-3 md:gap-10 px-3 md:px-10'>
      <div className='relative flex'>
        <img
          src="/savas.svg" 
          alt="Logo" 
          width={200}
          height={100}
          className='text-lg md:text-2xl cursor-pointer'
        />
      </div>
      
      
      <div className='border py-1 rounded-3xl bg-white w-full flex flex-row'>
        <input placeholder='Ne aramıştınız?' className=' flex-1 px-3 ml-3  items-center justify-center'  type="text" />
        <IoSearch className="text-black" size={25}/>
      </div>
      <RxHamburgerMenu className='relative flex md:hidden text-white' size="30"/>
      <div className='hidden md:flex items-center gap-4'> 
        <VscHeart className='text-3xl text-white ' />
        <AiOutlineUser className='text-3xl text-white ' />
        <AiOutlineShoppingCart className='text-3xl text-white'/>
      </div>
    </nav>
  );
};

export default Header;  






