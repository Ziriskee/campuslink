import React from 'react'
import FeedClient from './feed'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

export default async function Feed() {
 const session = await auth()
 const userId = session?.user?.id
 if (!session) {
  redirect("/auth/signin")
 }
  return (
    <main>
      <FeedClient userId={userId}/>
    </main>
  )
}
