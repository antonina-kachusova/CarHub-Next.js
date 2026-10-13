# CarHub — Next.js Car Catalogue

## Languages

[English](#english) | [Українська](#українська)

---

## English

CarHub is a responsive car catalogue application built with **Next.js**, **React**, **TypeScript**, **Tailwind CSS**, and **Headless UI**.

The application allows users to browse cars, search by manufacturer and model, filter results by fuel type and production year, view detailed car information in a modal window, and load more results with pagination-style behavior.
The web application is fully responsive and works correctly on mobile devices, tablets, and desktop screens.

## Live Demo

[View Live Demo](https://car-hub-next-js-seven.vercel.app/)

## Features

- Browse a catalogue of cars with images and key technical information
- Search cars by manufacturer
- Search cars by model
- Filter cars by fuel type
- Filter cars by production year
- View detailed car information in a modal window
- Display car images from different angles
- Show more results with a `Show More` button
- Store search and filter values in the URL query parameters
- Responsive layout for desktop, tablet, and mobile screens
- Clean component-based project structure

## Tech Stack

- **Next.js**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **Headless UI**
- **Fetch API**
- **CarAPI**
- **IMAGIN.studio**
- **Vercel**

## What I Used

### Next.js App Router

The project uses the Next.js App Router with the `app` directory.

The main page is created in:

```txt
app/page.tsx
```

The root layout is created in:

```txt
app/layout.tsx
```

The layout includes shared page elements such as the `Navbar` and `Footer`.

### Server and Client Components

The project uses both server and client components.

The main page fetches car data based on search parameters, while interactive components such as car cards, search inputs, filters, and modals use client-side logic.

Examples of client-side functionality:

- opening and closing the car details modal
- handling search form input
- updating URL query parameters
- interacting with dropdowns and filters

### TypeScript

TypeScript is used to type component props, car data, filters, and search parameters.

Examples of typed interfaces used in the project:

```ts
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
```

```ts
export interface FilterProps {
  manufacturer?: string;
  year?: number;
  model?: string;
  limit?: number;
  fuel?: string;
}
```

```ts
export interface HomeProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}
```

### `Record<>`

The project uses `Record<>` in the `HomeProps` type:

```ts
Record<string, string | string[] | undefined>
```

This means that `searchParams` is an object where:

- each key is a string
- each value can be a string, an array of strings, or undefined

This is useful because URL search parameters can contain different values depending on what the user selected.

### Fetch API

The project uses the Fetch API to request car data from external services.

The data is fetched from CarAPI and then normalized into the structure used by the application.

### URLSearchParams

`URLSearchParams` is used to work with query parameters in the browser URL.

This allows the application to save selected filters and search values in the URL.

Example:

```txt
?manufacturer=toyota&model=camry&year=2020&fuel=gas
```

This makes the search state shareable and easier to control.

### Tailwind CSS

Tailwind CSS is used for styling and responsive layout.

The project uses utility classes and custom reusable class names for sections such as:

- hero section
- car cards
- filters
- search bar
- modal window
- footer

### Headless UI

Headless UI is used for accessible interactive UI elements such as modal windows, transitions, and dropdown-style components.

In the car details modal, Headless UI helps manage the dialog and animation behavior.

### Next.js Image Optimization

The project uses the Next.js `Image` component to display optimized images.

Car images are generated using IMAGIN.studio and displayed in car cards and modal windows.

The external image domain is configured in `next.config.js`.

### External APIs

The project uses:

- **CarAPI** — to fetch car data, models, engines, mileage, and technical information
- **IMAGIN.studio** — to generate car images from different angles

## How It Works

The home page reads search parameters from the URL and passes them to the `fetchCars` function.

```ts
const result = await fetchCars({
  manufacturer: getParam("manufacturer") || "",
  year: year || undefined,
  fuel: getParam("fuel") || "",
  limit,
  model: getParam("model") || "",
});
```

The fetched cars are rendered with the `CarCard` component.

```tsx
{allCars.map((car, index) => (
  <CarCard key={`${car.make}-${car.model}-${car.year}-${index}`} car={car} />
))}
```

Each car card shows:

- car make and model
- calculated daily rental price
- car image
- transmission type
- drive type
- MPG value
- button to open the details modal

The `CarDetails` component displays additional technical information about the selected car.

## Project Structure

```txt
CarHub-Next.js/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── CarCard.tsx
│   ├── CarDetails.tsx
│   ├── CustomButton.tsx
│   ├── CustomFilter.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── Navbar.tsx
│   ├── Searchbar.tsx
│   ├── SearchManufecterer.tsx
│   ├── SearchModel.tsx
│   ├── ShowMore.tsx
│   └── index.ts
├── constants/
│   └── index.ts
├── public/
│   ├── bg.png
│   ├── car-logo.svg
│   ├── chevron-up-down.svg
│   ├── close.svg
│   ├── gas.svg
│   ├── hero.png
│   ├── magnifying-glass.svg
│   ├── model-icon.png
│   ├── right-arrow.svg
│   ├── steering-wheel.svg
│   └── tire.svg
├── types/
│   └── index.ts
├── utils/
│   └── index.ts
├── .gitignore
├── next.config.js
├── package.json
├── package-lock.json
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## Getting Started

To run this project locally, follow these steps.

### 1. Clone the repository

```bash
git clone https://github.com/antonina-kachusova/CarHub-Next.js.git
```

### 2. Open the project folder

```bash
cd CarHub-Next.js
```

### 3. Install dependencies

```bash
npm install
```

### 4. Run the development server

```bash
npm run dev
```

Open the application in your browser:

```txt
http://localhost:3000
```

## Available Scripts

```bash
npm run dev      # Start the development server
npm run build    # Build the application for production
npm run start    # Start the production server
npm run lint     # Run linting
```

## What I Practiced

In this project, I practiced:

- building a Next.js application with the App Router
- working with server and client components
- using TypeScript interfaces for props and API data
- fetching and transforming external API data
- working with URL search parameters
- creating reusable React components
- building responsive layouts with Tailwind CSS
- using Headless UI for interactive components
- working with the Next.js `Image` component
- deploying a Next.js project to Vercel

## Notes

This is a learning project created to practice Next.js, TypeScript, API integration, search, filtering, responsive layout, and reusable React components.

The application depends on external APIs and an internet connection to load car data and images correctly.

---

## Українська

CarHub — це адаптивний каталог автомобілів, створений за допомогою **Next.js**, **React**, **TypeScript**, **Tailwind CSS** та **Headless UI**.

Застосунок дозволяє переглядати автомобілі, шукати їх за виробником і моделлю, фільтрувати за типом пального та роком випуску, переглядати детальну інформацію про авто у модальному вікні та завантажувати більше результатів.
Вебзастосунок повністю адаптивний і коректно працює на мобільних пристроях, планшетах та десктопних екранах.

## Демо

[Переглянути демо](https://car-hub-next-js-seven.vercel.app/)

## Можливості

- Перегляд каталогу автомобілів із зображеннями та основною технічною інформацією
- Пошук автомобілів за виробником
- Пошук автомобілів за моделлю
- Фільтрація за типом пального
- Фільтрація за роком випуску
- Перегляд детальної інформації про автомобіль у модальному вікні
- Відображення зображень авто з різних ракурсів
- Завантаження додаткових результатів через кнопку `Show More`
- Збереження пошуку та фільтрів у URL-параметрах
- Адаптивна верстка для desktop, tablet і mobile
- Чиста компонентна структура проєкту

## Технології

- **Next.js**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **Headless UI**
- **Fetch API**
- **CarAPI**
- **IMAGIN.studio**
- **Vercel**

## Що я використала

### Next.js App Router

У проєкті використано Next.js App Router з папкою `app`.

Головна сторінка знаходиться у файлі:

```txt
app/page.tsx
```

Головний layout знаходиться у файлі:

```txt
app/layout.tsx
```

У layout підключені спільні елементи сторінки, наприклад `Navbar` і `Footer`.

### Server і Client Components

У проєкті використано як серверні, так і клієнтські компоненти.

Головна сторінка отримує дані про автомобілі на основі search parameters, а інтерактивні компоненти, такі як картки авто, пошук, фільтри та модальне вікно, використовують клієнтську логіку.

Приклади клієнтської логіки:

- відкриття та закриття модального вікна з деталями авто
- обробка введення у формах пошуку
- оновлення URL-параметрів
- робота з dropdown та фільтрами

### TypeScript

TypeScript використано для типізації props, даних про автомобілі, фільтрів і параметрів пошуку.

Приклади інтерфейсів у проєкті:

```ts
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
```

```ts
export interface FilterProps {
  manufacturer?: string;
  year?: number;
  model?: string;
  limit?: number;
  fuel?: string;
}
```

```ts
export interface HomeProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}
```

### `Record<>`

У проєкті використано `Record<>` у типі `HomeProps`:

```ts
Record<string, string | string[] | undefined>
```

Це означає, що `searchParams` — це об'єкт, де:

- кожен ключ є рядком
- кожне значення може бути рядком, масивом рядків або `undefined`

Це зручно для роботи з URL-параметрами, бо різні параметри можуть мати різний формат значень.

### Fetch API

У проєкті використано Fetch API для запиту даних із зовнішніх сервісів.

Дані отримуються з CarAPI, а потім приводяться до структури, яку використовує застосунок.

### URLSearchParams

`URLSearchParams` використовується для роботи з query parameters у браузерному URL.

Це дозволяє зберігати обрані фільтри та пошукові значення прямо в адресі сторінки.

Приклад:

```txt
?manufacturer=toyota&model=camry&year=2020&fuel=gas
```

Завдяки цьому стан пошуку можна контролювати і передавати через посилання.

### Tailwind CSS

Tailwind CSS використано для стилізації та адаптивної верстки.

У проєкті використовуються utility classes і власні повторно використовувані класи для таких частин:

- hero section
- car cards
- filters
- search bar
- modal window
- footer

### Headless UI

Headless UI використано для доступних інтерактивних UI-елементів, наприклад модального вікна, переходів і dropdown-компонентів.

У модальному вікні з деталями авто Headless UI допомагає керувати діалогом і анімацією.

### Next.js Image Optimization

У проєкті використано компонент Next.js `Image` для оптимізованого відображення зображень.

Зображення автомобілів генеруються через IMAGIN.studio і відображаються в картках авто та модальному вікні.

Зовнішній домен для зображень налаштований у `next.config.js`.

### Зовнішні API

У проєкті використано:

- **CarAPI** — для отримання даних про автомобілі, моделі, двигуни, витрати пального і технічні характеристики
- **IMAGIN.studio** — для генерації зображень автомобілів з різних ракурсів

## Як це працює

Головна сторінка читає search parameters з URL і передає їх у функцію `fetchCars`.

```ts
const result = await fetchCars({
  manufacturer: getParam("manufacturer") || "",
  year: year || undefined,
  fuel: getParam("fuel") || "",
  limit,
  model: getParam("model") || "",
});
```

Отримані автомобілі рендеряться через компонент `CarCard`.

```tsx
{allCars.map((car, index) => (
  <CarCard key={`${car.make}-${car.model}-${car.year}-${index}`} car={car} />
))}
```

Кожна картка автомобіля показує:

- марку та модель авто
- розраховану ціну оренди за день
- зображення автомобіля
- тип трансмісії
- тип приводу
- MPG-значення
- кнопку для відкриття модального вікна з деталями

Компонент `CarDetails` показує додаткову технічну інформацію про вибраний автомобіль.

## Структура проєкту

```txt
CarHub-Next.js/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── CarCard.tsx
│   ├── CarDetails.tsx
│   ├── CustomButton.tsx
│   ├── CustomFilter.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── Navbar.tsx
│   ├── Searchbar.tsx
│   ├── SearchManufecterer.tsx
│   ├── SearchModel.tsx
│   ├── ShowMore.tsx
│   └── index.ts
├── constants/
│   └── index.ts
├── public/
│   ├── bg.png
│   ├── car-logo.svg
│   ├── chevron-up-down.svg
│   ├── close.svg
│   ├── gas.svg
│   ├── hero.png
│   ├── magnifying-glass.svg
│   ├── model-icon.png
│   ├── right-arrow.svg
│   ├── steering-wheel.svg
│   └── tire.svg
├── types/
│   └── index.ts
├── utils/
│   └── index.ts
├── .gitignore
├── next.config.js
├── package.json
├── package-lock.json
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## Як запустити проєкт локально

### 1. Клонувати репозиторій

```bash
git clone https://github.com/antonina-kachusova/CarHub-Next.js.git
```

### 2. Перейти в папку проєкту

```bash
cd CarHub-Next.js
```

### 3. Встановити залежності

```bash
npm install
```

### 4. Запустити development server

```bash
npm run dev
```

Відкрити застосунок у браузері:

```txt
http://localhost:3000
```

## Доступні скрипти

```bash
npm run dev      # Запуск development server
npm run build    # Створення production build
npm run start    # Запуск production server
npm run lint     # Запуск перевірки linting
```

## Що я практикувала

У цьому проєкті я практикувала:

- створення Next.js застосунку з App Router
- роботу із server та client components
- використання TypeScript interfaces для props та API-даних
- отримання і трансформацію даних із зовнішнього API
- роботу з URL search parameters
- створення повторно використовуваних React-компонентів
- адаптивну верстку з Tailwind CSS
- використання Headless UI для інтерактивних компонентів
- роботу з компонентом Next.js `Image`
- деплой Next.js проєкту на Vercel

## Примітки

Це навчальний проєкт, створений для практики Next.js, TypeScript, API integration, search, filtering, responsive layout та reusable React components.

Застосунок залежить від зовнішніх API та інтернет-з'єднання для коректного завантаження даних про автомобілі та зображень.
