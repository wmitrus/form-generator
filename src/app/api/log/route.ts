import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

import { logToFile } from '@/lib/utils';
import logger from '@/pino';

export async function POST(_req: NextRequest) {
  const json = await _req.json();

  try {
    await logToFile(json);

    return NextResponse.json({ data: '', success: true }, { status: 201 });
  } catch (err) {
    if (err instanceof Error) {
      logger.error(err);
      console.log('Error appending data to file', err);
      return NextResponse.json({ err: { message: err.message }, success: false }, { status: 500 });
    } else {
      logger.error(err);
      console.log('Unexpected error', err);
      return NextResponse.json(
        { err: { message: 'An unexpected error occurred' }, success: false },
        { status: 500 },
      );
    }
  }
}
