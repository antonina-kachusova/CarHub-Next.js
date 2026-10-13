"use client";
import { ShowMoreProps } from "@/types";
import { CustomButton } from "@/components";
import { updateSearchParams } from "@/utils";
import { useRouter } from "next/navigation";

// Компонент "ShowMore", який приймає дві властивості: "pageNumber" та "isNext"
const ShowMore = ({ pageNumber, isNext }: ShowMoreProps) => {
  // Використовуємо хук "useRouter" для роботи з маршрутизацією
  const router = useRouter();

  // Функція, яка буде викликана при натисканні кнопки
  const handleNavigation = () => {
    // Розраховуємо новий ліміт на основі поточного номеру сторінки
    const newLimit = (pageNumber + 1) * 10;

    // Оновлюємо параметр "limit" в URL-адресі новим значенням
    const newPathname = updateSearchParams("limit", `${newLimit}`);
    
    // Переходимо на нову сторінку
    router.push(newPathname);
  };

  return (
    // Розмітка компоненту
    <div className="w-full flex-center gap-5 mt-10">
      {/* Якщо "isNext" є "false", то відображаємо кнопку */}
      {!isNext && (
        <CustomButton
          btnType="button"
          title="Show More"
          containerStyles="bg-primary-blue rounded-full text-white"
          handleClick={handleNavigation}
        />
      )}
    </div>
  );
};

export default ShowMore;