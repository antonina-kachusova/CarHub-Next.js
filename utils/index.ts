import { CarProps, FilterProps } from "../types";

interface CarApiCollection<T> {
  data: T[];
}

interface CarApiEngine {
  trim_id: number;
  year: number;
  make: string;
  model: string;
  trim_description: string;
  engine_type: string;
  fuel_type: string;
  cylinders: string | null;
  size: string | null;
  drive_type: string;
  transmission: string;
}

interface CarApiMileage {
  trim_id: number;
  combined_mpg: number | null;
  epa_city_mpg: number | null;
  epa_highway_mpg: number | null;
  epa_combined_mpg_electric: number | null;
  epa_city_mpg_electric: number | null;
  epa_highway_mpg_electric: number | null;
}

const CAR_API_URL = "https://carapi.app/api";

const getDriveCode = (driveType: string) => {
  const value = driveType.toLowerCase();

  if (value.includes("all wheel")) return "awd";
  if (value.includes("four wheel")) return "4wd";
  if (value.includes("front wheel")) return "fwd";
  if (value.includes("rear wheel")) return "rwd";
  return driveType;
};

export async function fetchCars(filters: FilterProps): Promise<CarProps[] | { message: string }> {
  const { manufacturer, year, model, limit, fuel } = filters;
  const searchParams = new URLSearchParams();

  if (manufacturer) searchParams.set("make", manufacturer);
  if (year) searchParams.set("year", String(year));
  if (model) searchParams.set("model", model);
  if (limit) searchParams.set("limit", String(limit));
  if (fuel) {
    const engineType = fuel.toLowerCase() === "electricity" ? "electric" : "gas";
    searchParams.set("json", JSON.stringify([
      { field: "engine_type", op: "=", val: engineType },
    ]));
  }

  try {
    const engineResponse = await fetch(
      `${CAR_API_URL}/engines/v2?${searchParams.toString()}`,
      {
        headers: { accept: "application/json" },
        next: { revalidate: 86400 },
      }
    );

    if (!engineResponse.ok) {
      throw new Error(`CarAPI returned ${engineResponse.status}`);
    }

    const engineResult = await engineResponse.json() as CarApiCollection<CarApiEngine>;
    const normalizedManufacturer = manufacturer?.toLowerCase();
    const normalizedModel = model?.toLowerCase();
    const normalizedFuel = fuel?.toLowerCase() === "electricity" ? "electric" : fuel?.toLowerCase();
    const engines = (engineResult.data ?? []).filter((engine) =>
      (!normalizedManufacturer || engine.make.toLowerCase() === normalizedManufacturer) &&
      (!normalizedModel || engine.model.toLowerCase() === normalizedModel) &&
      (!year || engine.year === year) &&
      (!normalizedFuel || engine.engine_type.toLowerCase() === normalizedFuel)
    );

    if (engines.length === 0) return [];

    const mileageParams = new URLSearchParams({
      limit: String(engines.length),
      json: JSON.stringify([
        { field: "trim_id", op: "in", val: engines.map((engine) => engine.trim_id) },
      ]),
    });
    const mileageResponse = await fetch(
      `${CAR_API_URL}/mileages/v2?${mileageParams.toString()}`,
      {
        headers: { accept: "application/json" },
        next: { revalidate: 86400 },
      }
    );
    const mileageResult = mileageResponse.ok
      ? await mileageResponse.json() as CarApiCollection<CarApiMileage>
      : { data: [] };
    const mileages = new Map(
      mileageResult.data.map((mileage) => [mileage.trim_id, mileage])
    );

    return engines.map((engine) => {
      const mileage = mileages.get(engine.trim_id);
      const isElectric = engine.engine_type === "electric";

      return {
        city_mpg: (isElectric ? mileage?.epa_city_mpg_electric : mileage?.epa_city_mpg) ?? 0,
        class: engine.trim_description,
        combination_mpg: (isElectric ? mileage?.epa_combined_mpg_electric : mileage?.combined_mpg) ?? 0,
        cylinders: Number(engine.cylinders?.match(/\d+/)?.[0] ?? 0),
        displacement: Number(engine.size ?? 0),
        drive: getDriveCode(engine.drive_type),
        fuel_type: engine.fuel_type,
        highway_mpg: (isElectric ? mileage?.epa_highway_mpg_electric : mileage?.epa_highway_mpg) ?? 0,
        make: engine.make,
        model: engine.model,
        transmission: engine.transmission.toLowerCase().includes("automatic") ? "a" : "m",
        year: engine.year,
      };
    });
  } catch (error) {
    console.error("Failed to fetch cars from CarAPI:", error);
    return { message: "Не вдалося завантажити автомобілі. Спробуйте ще раз." };
  }
}

export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 50;
  const mileageFactor = 0.1;
  const ageFactor = 0.05;
  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;
  return rentalRatePerDay.toFixed(0);
};

export const generateCarImageUrl = (car: CarProps, angle?: string) => {
  const url = new URL("https://cdn.imagin.studio/getimage");
  const { make, model, year } = car;
  url.searchParams.append('customer', 'img');
  url.searchParams.append('make', make);
  url.searchParams.append('modelFamily', model.split(" ")[0]);
  url.searchParams.append('zoomType', 'fullscreen');
  url.searchParams.append('modelYear', `${year}`);
  url.searchParams.append('angle', `${angle}`);

  return `${url}`;
} 

export const updateSearchParams = (type: string, value: string) => {
  // Отримуємо поточні параметри пошуку URL
  const searchParams = new URLSearchParams(window.location.search);

  // Встановлюємо зазначений параметр пошуку на задане значення
  searchParams.set(type, value);

  // Формуємо новий шлях з оновленими параметрами пошуку
  const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

  return newPathname;
};
