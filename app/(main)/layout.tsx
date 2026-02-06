import Header from '@/components/layout/Header';
import { getCurrentUser } from '@/lib/server/utils/auth.utils';
import React from 'react'

const MainLayout = async ({ children }: {children: React.ReactNode}) => {

  const user = await getCurrentUser();

  return (
    <>
        <Header user={user || null} />
        <main className='container mx-auto px-4 py-8'>
            {  children }
        </main>
    </>
  )
}

export default MainLayout;