// pages/dashboard.tsx
"use client";

// import { useEffect } from "react";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { Textarea } from "@/components/form";
import { FiShare2 } from "react-icons/fi"
import { FaTrash } from "react-icons/fa";

export default function Dashboard() {
    // const { data: session, status } = useSession();
    // const router = useRouter();

    // Redireciona para a home se não estiver logado
    // useEffect(() => {
    //     if (status === "unauthenticated") {
    //         router.push("/");
    //     }
    // }, [status, router]);

    // if (status === "loading") {
    //     return <p>Carregando...</p>;
    // }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center">
            <Head>
                <title>Painel de tarefas</title>
            </Head>

            {/* Conteúdo central */}
            <div className="w-full max-w-2xl bg-white shadow-md rounded-2xl p-6 mt-6">
                {/* Formulário */}
                {/* Formulário */}
                <form className="flex flex-col gap-4 mb-6">
                    <label htmlFor="tarefa" className="text-gray-700 font-medium">
                        Qual sua tarefa?
                    </label>

                    <Textarea placeholder="Digite qual sua tarefa..." />

                    <label className="flex items-center gap-2 text-gray-600 text-sm">
                        <input
                            type="checkbox"
                            name="status"
                            value="publica"
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        Deixe sua tarefa pública
                    </label>

                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-1 rounded-xl self-start hover:bg-blue-700 transition-colors"
                    >
                        Adicionar
                    </button>
                </form>
                {/* Lista de tarefas */}
                <ul className="space-y-3">
                    <li className="flex flex-col justify-between items-start bg-gray-60 p-4 border border-gray-300 rounded-lg hover:bg-gray-100 transition">

                        {/* Esquerda: status + compartilhar */}
                        <div className="flex flex-row items-center gap-2 mb-2">
                            <span className="bg-blue-700 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                                Público
                            </span>
                            <button
                                className="flex items-center gap-1 text-blue-500 hover:text-blue-700 transition"
                                aria-label="Compartilhar tarefa"
                            >
                                <FiShare2 size={16} />
                            </button>
                        </div>

                        <div className="flex items-center justify-between w-full">

                            <p className="text-gray-800  truncate">
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            </p>

                            <button
                                className="text-red-500 hover:text-red-700 transition"
                                aria-label="Remover tarefa"
                            >
                                <FaTrash size={16} />
                            </button>
                        </div>

                    </li>
                    <li className="flex flex-col justify-between items-start bg-gray-60 p-4 border border-gray-300 rounded-lg hover:bg-gray-100 transition">

                        {/* Esquerda: status + compartilhar */}


                        <div className="flex items-center justify-between w-full">

                            <p className="text-gray-800  truncate">
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            </p>

                        </div>

                    </li>
                </ul>

            </div>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {

    const session = await getSession({ req })

    if (!session?.user) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            }
        }
    }

    return {
        props: {},
    }

}
