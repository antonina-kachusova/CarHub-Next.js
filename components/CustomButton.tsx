"use client";

import { CustomButtonProps } from "@/types";
import Image from "next/image"

function CustomButton({ title, containerStyles, handleClick, btnType, isDisable, textStyles, rightIcon}: CustomButtonProps) {
  // isDisable, textStyles, rightIcon
  return (
    <button
    // disabled={false} 
    disabled={isDisable} 
    type={btnType || 'button'}
    className={`custom-btn ${containerStyles}`}
    onClick={handleClick}
    >
        {/* <span className={"flex-1"}>{title}</span> */}
        <span className={`flex-1 ${textStyles}`}>{title}</span>

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
  )
}

export default CustomButton