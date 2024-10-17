import { NextResponse } from 'next/server';
import { ref, child, get, runTransaction } from 'firebase/database';
import db from '@/lib/firebase';

export async function GET(request: Request): Promise<Response> {
  const slug = request.url.split('/').pop();
  
  if (!slug) {
    return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
  }

  const dbRef = ref(db);
  const snapshot = await get(child(dbRef, `views/${slug}`));
  return NextResponse.json({ total: snapshot.val() });
}

export async function POST(request: Request): Promise<Response> {
  const slug = request.url.split('/').pop();

  if (!slug) {
    return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
  }

  const dbRef = ref(db, `views/${slug}`);
  const { snapshot } = await runTransaction(dbRef, (views: number | null) => {
    if (views === null) {
      return 1;
    }
    return views + 1;
  });

  return NextResponse.json({ total: snapshot.val() });
}