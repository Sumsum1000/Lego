import logo from './Logo.jpg'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import Link from 'next/link';


const Logo = () => {

const logo = "/Logo.jpg"
const controls = useRef<HTMLParagraphElement | null>(null);



  return (
    <div className=" h-[12%]  z-10 absolute top-[15%] flex flex-col items-center">
        <div className="w-full h-full  flex flex-row ">
            <img className='h-full' src={logo}/>
            <div className='w-full h-full flex flex-col justify-between items-end ml-7'>
                <img src='LegoBrick.jpg' className='h-1/2'/>  
                <p  className="text-[250%] text-yellow-100 font-bold p-0 m-0 mt-4 tracking-widest" >#75384</p>
            </div>
        </div>
        <Link href='instructions' >
          <p ref={controls} className='inline-block text-3xl self-center mt-36 text-green-300'>Start Here</p>
        </Link>
    </div>
  )
}

export default Logo;