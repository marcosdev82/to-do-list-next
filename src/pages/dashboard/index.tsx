// pages/dashboard.tsx
import Head from "next/head";

export default function Dashboard() {

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center">

            <Head>
                <title>Painel de tarefas</title>
            </Head>

            {/* Conteúdo central */}
            <div className="w-full max-w-2xl bg-white shadow-md rounded-2xl p-6 mt-6">
                {/* Formulário */}
                <form className="flex gap-2 mb-4">
                    <input
                        type="text"
                        placeholder="Digite sua tarefa..."
                        className="flex-1 border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
                    >
                        Adicionar
                    </button>
                </form>

                {/* Lista de tarefas */}
                <ul className="space-y-2">

                    <li
                        key='1'
                        className="flex justify-between items-center bg-gray-50 p-3 rounded-lg"
                    >
                        <span className="text-gray-700">Tarefa</span>
                        <button
                            className="text-red-500 hover:text-red-700"

                        >
                            Remover
                        </button>
                    </li>

                </ul>
            </div>
        </div>
    );
}
