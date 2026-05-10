'use client'
import "./globals.css";
import Header from "../components/Header";
import { Provider } from "react-redux";
import { store } from "../store/store";
import ErrorBoundary from "@/components/ErrorBoundary";
import { ToastProvider } from '@/context/ToastContext';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Provider store={store}>
          <ErrorBoundary>
            <ToastProvider>
              <Header />
              {children}
            </ToastProvider>
          </ErrorBoundary>
        </Provider>
      </body>
    </html>
  );
}
