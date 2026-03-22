import './globals.css'

export const metadata = {
  title: 'Zockeria',
  description: 'Wo Gaming zur Lebensweise wird.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  )
}
