import { NextResponse } from "next/server"
import db from "@/lib/firebase"

export async function GET(request: Request): Promise<Response> {
  const slug = request.url.split("/").pop()

  if (!slug) {
    return NextResponse.json({ error: "Slug is required" }, { status: 400 })
  }

  if (!db) {
    return NextResponse.json({ total: 0 }, { status: 200 })
  }

  try {
    const snapshot = await Promise.race([
      db.ref("views").child(slug).once("value"),
      new Promise<never>((_, reject) => setTimeout(() => reject(new Error("timeout")), 5000)),
    ])
    return NextResponse.json({ total: snapshot.val() })
  } catch {
    return NextResponse.json({ total: 0 }, { status: 200 })
  }
}

export async function POST(request: Request): Promise<Response> {
  const slug = request.url.split("/").pop()

  if (!slug) {
    return NextResponse.json({ error: "Slug is required" }, { status: 400 })
  }

  if (!db) {
    return NextResponse.json({ total: 0 }, { status: 200 })
  }

  try {
    const ref = db.ref("views").child(slug)
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("timeout")), 5000)
    )
    const { snapshot } = await Promise.race([ref.transaction((views: number | null) => (views === null ? 1 : views + 1)), timeoutPromise])
    return NextResponse.json({ total: snapshot.val() })
  } catch {
    return NextResponse.json({ total: 0 }, { status: 200 })
  }
}
