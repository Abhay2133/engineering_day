import { Inter } from "next/font/google";
import Navbar from "./components/Navbar";
import "./globals.css";
import Footer from "./components/footer"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Engineering Day 2024",
  description:"Celebrate Engineer's Day at MAHOTSAVA 2024! Join us for two days of exciting events, competitions, and fun. Unleash your inner genius with activities like Code War, Web War, Engineer's Stride, and more. Don't miss out on the ultimate engineering celebration! Register now and be part of the excitement!"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      {/* <Navbar/> */}
        {children}
        <Footer/>
        </body>
    </html>
  );
}
