import BtnDeshboard from "./BtnDeshboard"


const Deshboard = () => {
  return (
    <div className="w-[10%] h-[40%] z-20 relative flex flex-row justify-center">
       <div className="absolute w-full h-full flex justify-center">
            <img  src='/Deshboard.png' className="h-full"/>
       </div>
       <div className="relative flex flex-col space-y-7 top-10 right-1">
            <BtnDeshboard />
            <BtnDeshboard />
        </div>
    </div>
  )
}

export default Deshboard
