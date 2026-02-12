import "@/styles/globals.css";
import "react-calendar/dist/Calendar.css";
import "@/styles/Calendar.css";
import { AuthProvider } from "@/contexts/AuthContext";

export default function App({ Component, pageProps }) {
    return (
        <AuthProvider>
            <Component {...pageProps} />
        </AuthProvider>
    );
}
