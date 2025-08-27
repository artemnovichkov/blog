import { NextResponse } from "next/server"
import db from "@/lib/firebase"

export async function GET(request: Request): Promise<Response> {
  const slug = request.url.split("/").pop()

  if (!slug) {
    return NextResponse.json({ error: "Slug is required" }, { status: 400 })
  }

  const snapshot = await db.ref("views").child(slug).once("value")
  return NextResponse.json({ total: snapshot.val() })
}

export async function POST(request: Request): Promise<Response> {
  const slug = request.url.split("/").pop()

  if (!slug) {
    return NextResponse.json({ error: "Slug is required" }, { status: 400 })
  }

  const ref = db.ref("views").child(slug)
  const { snapshot } = await ref.transaction((views: number | null) => {
    if (views === null) {
      return 1
    }
    return views + 1
  })

  return NextResponse.json({ total: snapshot.val() })
}
