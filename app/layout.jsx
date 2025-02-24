import { SignInAlertProvider } from "@/context/SigninAlertContext";
import { UserProvider } from "@/context/UserContext";
import localFont from "next/font/local";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ComparePopup from "./components/compare-popup";
import SignInAlert from "./components/ui/sign-in-alert";
import "./globals.css";
const Poppins = localFont({
  src: [
    {
      path: "./fonts/Poppins-Thin.ttf",
      weight: "100",
      style: "thin",
    },
    {
      path: "./fonts/Poppins-ExtraLight.ttf",
      weight: "200",
      style: "extralight",
    },
    {
      path: "./fonts/Poppins-Light.ttf",
      weight: "300",
      style: "light",
    },
    {
      path: "./fonts/Poppins-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Poppins-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/Poppins-Medium.ttf",
      weight: "500",
      style: "medium",
    },
    {
      path: "./fonts/Poppins-SemiBold.ttf",
      weight: "600",
      style: "semibold",
    },
    {
      path: "./fonts/Poppins-Bold.ttf",
      weight: "700",
      style: "bold",
    },
    {
      path: "./fonts/Poppins-ExtraBold.ttf",
      weight: "800",
      style: "extrabold",
    },
    {
      path: "./fonts/Poppins-Black.ttf",
      weight: "900",
      style: "black",
    },
  ],
  variable: "--font-poppins",
});

export const metadata = {
  title: "BestPeek - One Peek, Best Price",
  // description: "Shop Smarter Not Harder",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${Poppins.variable} font-poppins flex min-h-screen flex-col bg-[#1F2937] antialiased`}
      >
        <UserProvider>
          <SignInAlertProvider>
            <Header />
            <ComparePopup />
            <SignInAlert />
            <div className="flex w-full flex-grow flex-col bg-background">
              {children}
            </div>
            <Footer />
            <Toaster
              position="top-center"
              reverseOrder={false}
              gutter={2}
              toastOptions={{
                style: {
                  backgroundColor: "white",
                  color: "black",
                  padding: "11px",
                  borderRadius: "4px",
                  fontSize: "14px",
                },
                duration: 3000,
              }}
            />
          </SignInAlertProvider>
        </UserProvider>
      </body>
    </html>
  );
}
