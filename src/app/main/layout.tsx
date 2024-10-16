export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (  
    <html lang="en">
      <body   
 className="bg-gradient-to-r from-graycustom to-black ">
  <header className="flex justify-end items-center p-4">
    <a href="/about" className="  hover:underline border p-2 mr-3 text-gray-900 bg-gradient-to-r w-20 from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-md text-sm px-5 py-2.5 text-center mb-4 md:mb-2"
          >About</a>
  </header>
  {children}
    </body>
    </html>
  );
}
