// pages/dashboard.tsx
"use client";

// import { useEffect } from "react";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { Textarea } from "@/components/form";

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
                        className="bg-blue-600 text-white px-6 py-2 rounded-xl self-start hover:bg-blue-700 transition-colors"
                    >
                        Adicionar
                    </button>
                </form>
                {/* Lista de tarefas */}
                <ul className="space-y-2">
                    <li className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                        <span className="text-gray-700">Tarefa</span>
                        <button className="text-red-500 hover:text-red-700">Remover</button>
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
