import { CustomFilter, Hero, Searchbar, CarCard, ShowMore } from '@/components'
import { fetchCars } from '@/utils'
import { HomeProps } from "@/types";

import { fuels, yearsOfProduction } from "@/constants";

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const getParam = (name: string) => {
    const value = params[name];
    return Array.isArray(value) ? value[0] : value;
  };

  const year = Number(getParam("year"));
  const limit = Number(getParam("limit")) || 10;

  const result = await fetchCars({
    manufacturer: getParam("manufacturer") || "",
    year: year || undefined,
    fuel: getParam("fuel") || "",
    limit,
    model: getParam("model") || "",
  });

  const allCars = Array.isArray(result) ? result : [];
  const errorMessage = Array.isArray(result) ? "" : result.message;
  const isDataEmpty = allCars.length < 1;

  return (
    <main className="overflow-hidden">
      <Hero />

      <div className='mt-12 padding-x padding-y max-width' id='discover'>

        <div className='home__text-container'>
          <h1 className='text-4xl font-extrabold'>Car Catalogue</h1>
          <p>Explore out cars you might like</p>
        </div>

        <div className='home__filters'>
          <Searchbar />

          <div className='home__filter-container'>

            <CustomFilter title='fuel' options={fuels} />
            <CustomFilter title='year' options={yearsOfProduction} />
          </div>
        </div>

        {
          !isDataEmpty
            ? (
              <section>
                {/* Маємо машини */}
                <div className="home__cars-wrapper">
                  {allCars.map((car, index) => (
                    <CarCard key={`${car.make}-${car.model}-${car.year}-${index}`} car={car} />
                  ))}
                </div>

                <ShowMore
                  pageNumber={limit / 10}
                  isNext={limit > allCars.length}
                />

              </section>
            )
            : (
              <div className='home__error-container'>
                <h2 className='text-black text-xl font-bold'>
                  Результатів не знайдено
                </h2>
                <p>{errorMessage}</p>
              </div>
            )
        }


      </div>
    </main>
  )
}
