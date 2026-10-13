import { NextRequest, NextResponse } from 'next/server';

interface CarApiModel {
  name: string;
}

export async function GET(request: NextRequest) {
  const make = request.nextUrl.searchParams.get('make')?.trim();
  const year = request.nextUrl.searchParams.get('year')?.trim();

  if (!make) {
    return NextResponse.json({ models: [] });
  }

  const params = new URLSearchParams({ make, limit: '100' });
  if (year) params.set('year', year);

  try {
    const response = await fetch(`https://carapi.app/api/models/v2?${params.toString()}`, {
      headers: { accept: 'application/json' },
      next: { revalidate: 86400 },
    });

    if (!response.ok) {
      throw new Error(`CarAPI returned ${response.status}`);
    }

    const result = await response.json() as { data?: CarApiModel[] };
    const models = Array.from(new Set((result.data ?? []).map((item) => item.name)))
      .sort((a, b) => a.localeCompare(b));

    return NextResponse.json({ models });
  } catch (error) {
    console.error('Failed to fetch models from CarAPI:', error);
    return NextResponse.json({ message: 'Не вдалося завантажити моделі' }, { status: 502 });
  }
}
