import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const payload = await req.json();
    console.log("Received selection:", payload);
    return NextResponse.json({ status: 'ok' });
}
