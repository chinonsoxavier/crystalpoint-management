import { ArrowUpIcon } from "lucide-react";
type IHoverArrow = {
  variant?:string;
  className?:string
}

const HoverArrow = ({variant,className}:IHoverArrow) => {

  const colorSchemes = () =>{
    if (!variant) {
      return "bg-white text-primary";
    } else if (variant === "secondary") {
      return "bg-white text-black";
    } else if (variant === "dark") {
      return "text-black bg-white";
    } else if (variant === "light") {
      return "text-white bg-black";
    }   else if(variant === 'custom'){
      return;
    }
  }

  return (
    <div className={`${colorSchemes()} ${className} center w-4.5 h-4.5 rounded-full`}>
      <ArrowUpIcon className="delay-200 group-hover:rotate-90 rotate-45 mx-auto" />
    </div>
  );
}

export default HoverArrow