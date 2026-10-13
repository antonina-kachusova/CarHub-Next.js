"use client";

// Імпортуємо необхідні бібліотеки та модулі
import { Fragment, useState } from "react"; // Fragment для групування JSX, useState для роботи зі станом
import Image from "next/image"; // Компонент для оптимізованого завантаження зображень
import { useRouter } from "next/navigation"; // useRouter для програмної навігації
import { Listbox, Transition } from "@headlessui/react"; // UI компоненти

import { CustomFilterProps } from "@/types"; // Імпорт типів
import { updateSearchParams } from "@/utils"; // Функція для оновлення URL

// Основний компонент для фільтру
export default function CustomFilter({ title, options }: CustomFilterProps) {
//   // Використання useRouter для доступу до маршруту
  const router = useRouter();

//   // Стан для зберігання обраної опції
  const [selected, setSelected] = useState(options[0]);

  // Функція для оновлення параметрів URL
  const handleUpdateParams = (e: { title: string; value: string }) => {
    // Отримання нового шляху з оновленими параметрами пошуку
    const newPathName = updateSearchParams(title, e.value.toLowerCase());

    // Програмне перенаправлення на новий шлях
    router.push(newPathName);
  };

  return (
    // Основний контейнер компоненту
    <div className='w-fit'>
      {/* Випадаючий список для вибору опцій */}
      <Listbox
        value={selected}
        onChange={(e) => {
          // Оновлюємо обрану опцію в стані
          setSelected(e);

          // Оновлюємо параметри пошуку в URL та переходимо на новий URL
          handleUpdateParams(e);
        }}
      >
        {/* Контейнер для кнопки та опцій */}
        <div className='relative w-fit z-10'>
          {/* Кнопка для відкриття випадаючого списку */}
          <Listbox.Button className='custom-filter__btn'>
            <span className='block truncate'>{selected.title}</span>
            {/* Іконка зі стрілкою вверх/вниз */}
            <Image src='/chevron-up-down.svg' width={20} height={20} className='ml-4 object-contain' alt='chevron_up-down' />
          </Listbox.Button>

          {/* Анімація при відкритті/закритті випадаючого списку */}
          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            {/* Опції випадаючого списку */}
            <Listbox.Options className='custom-filter__options'>
              {options.map((option) => (
                <Listbox.Option
                  key={option.title}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 px-4 ${
                      active ? "bg-primary-blue text-white" : "text-gray-900"
                    }`
                  }
                  value={option}
                >
                  {({ selected }) => (
                    <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`} >
                      {option.title}
                    </span>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
