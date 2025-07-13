import { Navbar } from "../components/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
    <div className="flex flex-col items-center">
        <Navbar />
        {children}
    </div>
    );
}