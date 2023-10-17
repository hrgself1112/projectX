import Providers from '@/redux/Provider/Provider'
import './globals.css'
import { Inter } from 'next/font/google'
import '@ckeditor/ckeditor5-basic-styles/theme/code.css'
import NavbarMenu from '@/components/navbar/navbarMenu'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Astrosage CMS',
  description: 'Generated by Hritik@astrosage.com',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <NavbarMenu/>
        {children}
        </Providers>
        </body>
    </html>
  )
}
