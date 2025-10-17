// app/api/calendar-events/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const timeMin = searchParams.get('timeMin');
  const timeMax = searchParams.get('timeMax');

  const API_KEY = process.env.GOOGLE_CALENDAR_API_KEY;
  const CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID;

  if (!API_KEY || !CALENDAR_ID) {
    return NextResponse.json({ error: 'API key or Calendar ID is not configured.' }, { status: 500 });
  }
  
  if (!timeMin || !timeMax) {
      return NextResponse.json({ error: 'timeMin and timeMax are required query parameters.' }, { status: 400 });
  }

  const url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}&timeMin=${timeMin}&timeMax=${timeMax}&singleEvents=true&orderBy=startTime`;

  try {
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Google Calendar API Error:", errorData);
      return NextResponse.json({ error: 'Failed to fetch calendar events', details: errorData }, { status: response.status });
    }

    const data = await response.json();
    const events = data.items.map((item: any) => ({
      id: item.id,
      title: item.summary,
      start: item.start.dateTime || item.start.date,
      end: item.end.dateTime || item.end.date,
    }));

    return NextResponse.json({ events });
  } catch (error) {
    console.error("Error fetching calendar events:", error);
    return NextResponse.json({ error: 'An error occurred while fetching calendar events.' }, { status: 500 });
  }
}