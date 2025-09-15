"use client";

import Image from "next/image";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { FaGithub } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import logo from "../../../public/to-do-list.png";
import Avatar from "../avatar";

export default function Header() {
    const { data: session, status } = useSession();

    return (
        <header className="w-full flex flex-col md:flex-row items-center justify-between bg-white shadow-lg px-6 py-4 gap-4 md:gap-0">
            {/* Logo + título */}
            <div>
                <Link href="/" className="flex items-center gap-2">
                    <Image src={logo} alt="Logo" width={40} height={40} className="rounded-full" />
                    <h1 className="text-xl md:text-2xl font-bold text-gray-800">
                        Organizador de Tarefas
                    </h1>
                </Link>
            </div>

            {/* Navegação */}
            <nav className="flex items-center gap-4 text-black">
                {session?.user && (
                    <>
                        <Link href="/dashboard" className="hover:underline">
                            Painel de tarefas
                        </Link>
                        <span className="text-gray-400">|</span>
                        <Avatar
                            image={session.user.image ?? ""}
                            name={session.user.name ?? "Usuário"}
                        />
                    </>
                )}

                {/* Login / Logout */}
                {status === "loading" ? null : session ? (
                    <button
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="hover:text-red-600 transition"
                        aria-label="Sair"
                    >
                        <FiLogOut size={20} />
                    </button>
                ) : (
                    <button
                        onClick={() => signIn("github", { callbackUrl: "/" })}
                        className="flex items-center gap-2 hover:underline transition"
                    >
                        <FaGithub size={18} />
                        Login com GitHub
                    </button>
                )}
            </nav>
        </header>
    );
}
