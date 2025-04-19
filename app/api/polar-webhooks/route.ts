import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(req: NextRequest) {
  const payload = await req.json()

  const { event, user, product } = payload

  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  if (event === 'purchase.completed') {
    const { data, error } = await supabase
      .from('users')
      .update({ is_premium: true })
      .eq('email', user.email)

    if (error) return NextResponse.json({ error }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
