import Image from "next/image";
import logo from "../../../public/to-do-list.png";
import Link from "next/link";

export default function Header() {
    return (
        <header className="w-full flex flex-col md:flex-row items-center justify-between bg-white shadow-lg shadow-gray-400/20 px-6 py-4 gap-4 md:gap-0">
            {/* Logo + título */}
            <div>
                <Link href="/" className="flex items-center gap-2">
                    <Image
                        src={logo}
                        alt="Logo"
                        width={40}
                        height={40}
                        className="rounded-full"
                    />
                    <h1 className="text-xl md:text-2xl font-bold text-gray-800 text-center md:text-left">
                        Organizador de Tarefas
                    </h1>
                </Link>
            </div>

            {/* Links de navegação */}
            <nav className="flex gap-2">
                <Link
                    href="/dashboard"
                    className="rounded-full border border-blue-600 text-blue-600 px-4 py-2 font-medium hover:bg-blue-600 hover:text-white transition text-sm md:text-base"
                >
                    Painel de tarefas
                </Link>
                <Link
                    href="#"
                    className="rounded-full border border-green-600 text-green-600 px-4 py-2 font-medium hover:bg-green-600 hover:text-white transition text-sm md:text-base"
                >
                    Acessar
                </Link>
            </nav>
        </header>
    );
}
