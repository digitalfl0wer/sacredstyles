import { NextResponse } from 'next/server';

export function GET() {
  const provider = process.env.NEXT_PUBLIC_GEN_PROVIDER ?? 'mock';
  const hasToken = Boolean(process.env.REPLICATE_API_TOKEN);
  const hasModel = Boolean(process.env.REPLICATE_MODEL);
  return NextResponse.json({ provider, hasToken, hasModel });
}

