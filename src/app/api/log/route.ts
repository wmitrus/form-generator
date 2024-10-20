import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

import { appendFile } from 'fs/promises';

export async function POST(_req: NextRequest) {
  const json = await _req.json();
  const body = JSON.stringify(json);

  try {
    const fileName = './logs/client.log';
    await appendFile(fileName, `\n${body}`, 'utf-8');

    return NextResponse.json({ data: '', success: true }, { status: 201 });
  } catch (err) {
    console.log('Error appending data to file', err);

    return NextResponse.json({ err, success: false }, { status: 500 });
  }
}
