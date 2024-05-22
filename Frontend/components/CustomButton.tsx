"use client";

import { CustomButtonProps } from "@/types";
import Image from "next/image";

export default function CustomButton({
  title,
  containerStyles,
  handleClick,
  btnType,
  textStyles,
  rightIcon,
  isDisabled,
}: CustomButtonProps) {
  return (
    
    <button
      disabled={isDisabled}
      type={btnType || "button"}
      className={`${containerStyles}  custom-btn hover:bg-white text-white  hover:text-primary-blue ring-offset-1 ring-transparent ring-2 hover:ring-primary-blue `}
      onClick={handleClick}
    >
      <span className={`flex-1 text-[14px] 
                    leading-[17px] font-bold  ${textStyles}`}>{title}</span>
      {rightIcon && (
        <div className="relative w-6 h-6">
          <Image
            src={rightIcon}
            alt="arrow_left"
            fill
            className="object-contain"
          />
        </div>
      )}
    </button>
  );
}
