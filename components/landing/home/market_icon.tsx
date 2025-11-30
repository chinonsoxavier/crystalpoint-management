import forexImage from "@/assets/svg/in-equity-11-icon-1.svg";
import indicesImage from "@/assets/svg/in-equity-11-icon-2.svg";
import stocksImage from "@/assets/svg/in-equity-11-icon-3.svg";
import metalsImage from "@/assets/svg/in-equity-11-icon-4.svg";
import energiesImage from "@/assets/svg/in-equity-11-icon-6.svg";
import Image from "next/image";
interface MarketIconProps {
  type: string;
}

export function MarketIcon({ type }: MarketIconProps) {
  switch (type) {
    case "forex":
      return <Image className="w-12 h-12" src={forexImage} alt=''/>;
    case "indices":
      return indicesImage;
    case "stocks":
      return stocksImage;
    case "metals":
      return metalsImage;
    case "energies":
      return energiesImage;
    default:
      return null;
  }
}
