import { getSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { GetServerSideProps } from "next";
import { Textarea } from "@/components/form";
import { FiShare2 } from "react-icons/fi"
import { FaTrash } from "react-icons/fa";
import { ChangeEvent, FormEvent, useState, useEffect } from "react";

import { db } from '../../services/firebaseConnection'

import {
    addDoc,
    collection,
    query,
    orderBy,
    where,
    onSnapshot,
    doc,
    deleteDoc
} from 'firebase/firestore';

interface HomeProps {
    user: {
        email: string
        name: string
    }
}

interface TaskProps {
    id: string;
    created: Date;
    public: boolean;
    tarefa: string;
    email: string;
    name: string;
}

export default function Dashboard({ user }: HomeProps) {

    const [input, setInput] = useState("")
    const [publicTask, setPublicTask] = useState(false)
    const [tasks, setTasks] = useState<TaskProps[]>([])

    useEffect(() => {
        async function loadTarefas() {
            const tarefasRef = collection(db, "tarefas")
            const q = query(
                tarefasRef,
                orderBy("created", "desc"),
                // where("email", "==", user?.email),

            )

            onSnapshot(q, (snapshot) => {
                let lista = [] as TaskProps[]

                snapshot.forEach((doc) => {
                    lista.push({
                        id: doc.id,
                        tarefa: doc.data().tarefa,
                        created: doc.data().created,
                        public: doc.data().public,
                        email: doc.data().email,
                        name: doc.data().name
                    });
                });

                setTasks(lista)
            })
        }

        loadTarefas()
    }, [user?.email])

    function handleChangePublic(event: ChangeEvent<HTMLInputElement>) {
        setPublicTask(event.target.checked)
    }

    async function handleRegisterTask(event: FormEvent) {
        event.preventDefault();

        if (input === "") return;

        try {
            await addDoc(collection(db, "tarefas"), {
                tarefa: input,
                created: new Date(),
                email: user?.email,
                name: user?.name,
                public: publicTask
            });
        } catch (err) {
            console.log(err);
        }

        setInput("");
        setPublicTask(false);
    }

    async function handleShared(id: string) {
        await navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_URL}/task/${id}`)
    }

    async function handleDeleteTask(id: string) {
        const docRef = doc(db, "tarefas", id);
        await deleteDoc(docRef);
    }

    return (
        <div className="min-h-screen flex flex-col items-center">
            <Head>
                <title>Painel de tarefas</title>
            </Head>

            <div className="w-full max-w-2xl bg-white rounded-2xl p-6 mt-6">

                <form className="flex flex-col gap-4 mb-6" onSubmit={handleRegisterTask}>
                    <label htmlFor="tarefa" className="text-gray-700 font-medium">
                        Qual sua tarefa?
                    </label>

                    <Textarea
                        placeholder="Digite qual sua tarefa..."
                        value={input}
                        onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setInput(event.target.value)}
                    />

                    <label className="flex items-center gap-2 text-gray-600 text-sm">
                        <input
                            type="checkbox"
                            name="status"
                            value="publica"
                            checked={publicTask}
                            onChange={handleChangePublic}
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

                <ul className="space-y-3">
                    {tasks.map((item) => (
                        <li key={item.id} className="flex flex-col justify-between items-start bg-gray-60 p-4 border border-gray-300 rounded-lg hover:bg-gray-100 transition">

                            {item.public && (
                                <div className="flex flex-row items-center gap-2 mb-2">
                                    <span className="bg-blue-700 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                                        Público
                                    </span>
                                    <div className='mt-4 text-sm text-gray-600'>
                                        <span>Criada por: {item?.name} </span> <br />
                                        {/* <span>Data de criação: {item?.created}</span> */}
                                    </div>
                                    <button
                                        className="flex items-center gap-1 text-blue-500 hover:text-blue-700 transition"
                                        aria-label="Compartilhar tarefa"
                                        onClick={() => handleShared(item.id)}
                                    >
                                        <FiShare2 size={16} />
                                    </button>
                                </div>
                            )}
                            <div className="flex items-center justify-between w-full">

                                <p className="text-gray-800  truncate">

                                    {item.public ? (
                                        <Link href={`/task/${item.id}`}>
                                            {item.tarefa}
                                        </Link>
                                    ) : (
                                        item.tarefa
                                    )}
                                </p>

                                <button
                                    className="text-red-500 hover:text-red-700 transition"
                                    aria-label="Remover tarefa"
                                    onClick={() => handleDeleteTask(item.id)}
                                >
                                    <FaTrash size={16} />
                                </button>
                            </div>

                        </li>
                    ))}

                </ul>

            </div>
        </div >
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
        props: {
            user: {
                name: session?.user?.name,
                email: session?.user?.email
            }
        }
    }

}
