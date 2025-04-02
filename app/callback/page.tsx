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
        // Handle URL hash parameters
        const hash = window.location.hash.substring(1)
        const params = new URLSearchParams(hash)
        
        const accessToken = params.get('access_token')
        const expiresAt = params.get('expires_at')
        const expiresIn = params.get('expires_in')
        const refreshToken = params.get('refresh_token')
        const tokenType = params.get('token_type')
        const providerToken = params.get('provider_token')

        if (accessToken) {
          // Store tokens in localStorage
          localStorage.setItem('accessToken', accessToken)
          localStorage.setItem('token_type', tokenType || '')
          localStorage.setItem('expires_in', expiresIn || '')
          localStorage.setItem('expires_at', expiresAt || '')
          localStorage.setItem('refresh_token', refreshToken || '')

          // Get user info
          const { data: { user }, error } = await supabase.auth.getUser(accessToken)
          
          if (error) throw error
          if (user) {
            localStorage.setItem('user', JSON.stringify(user))
          }

          toast({
            title: "Success",
            description: "You have successfully logged in.",
          })

          const redirectUrl = process.env.NEXT_PUBLIC_REDIRECT_URL;
          if (!redirectUrl) {
            console.warn("Redirect URL is not set, defaulting to home page.");
            router.push("/");
            return;
          }
          
          if (redirectUrl.startsWith("http")) {
            window.location.href = redirectUrl;
          } else {
            router.push(redirectUrl);
          }  
        } else {
          throw new Error('No access token found in URL')
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