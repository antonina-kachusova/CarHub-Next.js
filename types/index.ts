import { MouseEventHandler } from 'react'

export interface CustomButtonProps {
    isDisable?: boolean;
    btnType?: "button" | "submit";
    containerStyles?: string;
    textStyles?: string;
    title: string;
    rightIcon?: string;
    handleClick?: MouseEventHandler<HTMLButtonElement>
}

export interface SearchManufectererProps {
    manufecterer: string;
    setManufecterer: (manufecterer: string) => void;
}

export interface CarProps {
    city_mpg: number;
    class: string;
    combination_mpg: number;
    cylinders: number;
    displacement: number;
    drive: string;
    fuel_type: string;
    highway_mpg: number;
    make: string;
    model: string;
    transmission: string;
    year: number;
}


export interface FilterProps {
    manufacturer?: string;
    year?: number;
    model?: string;
    limit?: number;
    fuel?: string;
}

export interface HomeProps {
    searchParams: Promise<Record<string, string | string[] | undefined>>;
}


export interface CustomFilterProps {
    title: string;
    options: OptionProps[];
}
export interface OptionProps {
    title: string;
    value: string;
}

export interface ShowMoreProps {
    pageNumber: number; // Номер сторінки
    isNext: boolean;    // Чи є наступна сторінка
  }
