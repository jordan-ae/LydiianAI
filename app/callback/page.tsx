"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/lib/supabase-client"

export default function CallbackPage() {
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const handleAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()

        if (error) throw error

        if (session) {
          localStorage.setItem('accessToken', session.access_token)
          localStorage.setItem('token_type', session.token_type)
          localStorage.setItem('expires_in', session.expires_in.toString())
          localStorage.setItem('expires_at', session.expires_at?.toString() || '')
          localStorage.setItem('refresh_token', session.refresh_token)
          localStorage.setItem('user', JSON.stringify(session.user))

          toast({
            title: "Success",
            description: "You have successfully logged in.",
          })

          router.push("/")
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to authenticate. Please try again.",
          variant: "destructive",
        })
        router.push("/login")
      }
    }

    handleAuth()
  }, [router, toast])

  return (
    <div className="w-full flex items-center justify-center h-screen">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-600">Authenticating your session...</p>
      </div>
    </div>
  )
} 