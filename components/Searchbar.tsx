'use client';

import Image from 'next/image';
import React, { useState } from 'react';
// Імпорт хука useRouter з Next.js для роботи з маршрутизацією
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

import SearchManufecterer from "./SearchManufecterer";
import SearchModel from "./SearchModel";

// Створюємо компонент SearchButton, який приймає зовнішні стилі через пропси
const SearchButton = ({ otherClasses }: { otherClasses: string }) => (
  <button type='submit' className={`-ml-3 z-10 ${otherClasses}`}>
    <Image
      src={"/magnifying-glass.svg"}
      alt={"magnifying glass"}
      width={40}
      height={40}
      className='object-contain'
    />
  </button>
);

const Searchbar = () => {
  const [manufecterer, setManufecterer] = useState('');
  // Стан для моделі та хук для роутингу
  const [model, setModel] = useState("");
  const router = useRouter();
  const currentSearchParams = useSearchParams();
  const selectedYear = currentSearchParams.get('year') || undefined;
 

  // Обробник події для форми пошуку
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (manufecterer.trim() === "" && model.trim() === "") {
      return alert("Please provide some input");
    }
  
    updateSearchParams(model.toLowerCase(), manufecterer.toLowerCase());
  };

  // Функція для оновлення параметрів URL
  const updateSearchParams = (model: string, manufecterer: string) => {
    // Створюємо новий об'єкт URLSearchParams, використовуючи поточні параметри пошуку URL
    const searchParams = new URLSearchParams(window.location.search);
  
    // Оновлюємо або видаляємо параметр 'model' в залежності від його значення
    if (model) {
      searchParams.set("model", model);
    } else {
      searchParams.delete("model");
    }
  
    // Оновлюємо або видаляємо параметр 'manufacturer'
    if (manufecterer) {
      searchParams.set("manufacturer", manufecterer);
    } else {
       searchParams.delete("manufacturer");
    }

    // Новий пошук починаємо з перших 10 результатів.
    searchParams.delete("limit");
  
    // Генеруємо новий шлях з оновленими параметрами пошуку
    const newPathname = `${window.location.pathname}?${searchParams.toString()}`;
  
    router.push(newPathname);
  }

  return (
    <form className='searchbar' onSubmit={handleSearch}>
      <div className="searchbar__item">
        <SearchManufecterer
          manufecterer={manufecterer}
          setManufecterer={setManufecterer}
        />
        <SearchButton otherClasses='sm:hidden' />
      </div>

      {/* Блок для пошуку по моделі */}
      <div className='searchbar__item z-10'>
        <SearchModel
          manufacturer={manufecterer}
          model={model}
          setModel={setModel}
          year={selectedYear}
        />
        <SearchButton otherClasses='sm:hidden' />
      </div>
      {/* Кнопка пошуку для великих екранів */}
      <SearchButton otherClasses='max-sm:hidden' />
    </form>
  )
}

export default Searchbar;
