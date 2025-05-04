"use client"
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/hooks/useAuth'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'

type Props = {}

const GoogleLoginCallBack = (props: Props) => {
  const  searchParams  = useSearchParams()
  const router  = useRouter()
  const { loginSocialCallback, error} = useAuthStore()
  useEffect(() => {
    const code = searchParams.get('code')
    const provider = searchParams.get('provider')
    if (code) {
      loginSocialCallback("google", code)
    }
  }
  , [searchParams, loginSocialCallback])

  useEffect(() => {
    if (error) {
      router.push('/login')
    }
  }, [error, router])

  return (
    <div>
      <h1 className='text-3xl font-bold tracking-tight text-primary'>Login with Google</h1>
    </div>
  )
}

export default GoogleLoginCallBack