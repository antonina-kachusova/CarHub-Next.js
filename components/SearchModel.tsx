'use client';

import { Combobox, Transition } from '@headlessui/react';
import Image from 'next/image';
import { Fragment, useEffect, useRef, useState } from 'react';

interface SearchModelProps {
  manufacturer: string;
  model: string;
  setModel: (model: string) => void;
  year?: string;
}

const SearchModel = ({ manufacturer, model, setModel, year }: SearchModelProps) => {
  const [models, setModels] = useState<string[]>([]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setModels([]);
    setModel('');

    if (!manufacturer) return;

    const controller = new AbortController();
    const params = new URLSearchParams({ make: manufacturer });
    if (year) params.set('year', year);

    setIsLoading(true);
    fetch(`/api/models?${params.toString()}`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error('Failed to load models');
        return response.json() as Promise<{ models: string[] }>;
      })
      .then((result) => setModels(result.models))
      .catch((error: Error) => {
        if (error.name !== 'AbortError') setModels([]);
      })
      .finally(() => setIsLoading(false));

    return () => controller.abort();
  }, [manufacturer, year, setModel]);

  const filteredModels = query === ''
    ? models
    : models.filter((item) =>
        item.toLowerCase().replace(/\s+/g, '').includes(query.toLowerCase().replace(/\s+/g, ''))
      );

  return (
    <Combobox value={model} onChange={setModel} disabled={!manufacturer}>
      {({ open }) => (
        <div className='relative w-full z-10'>
          <Combobox.Button ref={buttonRef} className='absolute top-[14px] z-10'>
            <Image src='/model-icon.png' width={20} height={20} className='ml-4' alt='car model' />
          </Combobox.Button>
          <Combobox.Input
            className='searchbar__input disabled:cursor-not-allowed disabled:opacity-60'
            displayValue={(item: string) => item}
            onFocus={() => {
              if (!open) buttonRef.current?.click();
            }}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={manufacturer ? 'Choose a model...' : 'Choose manufacturer first'}
          />

          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className='absolute z-30 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
              {isLoading ? (
                <div className='search-manufacturer__option text-gray-500'>Завантаження...</div>
              ) : filteredModels.length === 0 ? (
                <div className='search-manufacturer__option text-gray-500'>Моделей не знайдено</div>
              ) : filteredModels.map((item) => (
                <Combobox.Option
                  key={item}
                  value={item}
                  className={({ active }) => `search-manufacturer__option ${active ? 'bg-primary-blue text-white' : 'text-gray-900'}`}
                >
                  {item}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          </Transition>
        </div>
      )}
    </Combobox>
  );
};

export default SearchModel;
