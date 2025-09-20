import { ChangeEvent, FormEvent, useState } from 'react';
import { useSession } from "next-auth/react";
import { GetServerSideProps } from 'next';
import Head from 'next/head';

import { db } from '@/services/firebaseConnection';
import {
    doc,
    collection,
    query,
    where,
    getDoc,
    addDoc,
    getDocs,
    orderBy

} from 'firebase/firestore';
import { Textarea } from '@/components/form';
import { FaTrash } from 'react-icons/fa';

interface TaskProps {
    item: {
        taskId: string;
        created: string; // já vem formatada como string pelo toLocaleDateString
        public: boolean;
        tarefa: string;
        email: string;
        name: string;
    },
    allComments: CommentProps[]
}

interface CommentProps {
    id: string;
    created: string;
    comment: string;
    taskId: string;
    name: string;
    email: string;

}

export default function Task({ item, allComments }: TaskProps) {


    const { data: session } = useSession();
    const [input, setInput] = useState("");
    const [comments, setComments] = useState<CommentProps[]>(allComments || []);

    async function handleComment(event: FormEvent) {
        event.preventDefault();

        if (input === "") return;

        if (!session?.user?.email || !session?.user?.name) return;

        try {
            const docRef = await addDoc(collection(db, "comments"), {
                created: new Date(),
                comment: input,
                taskId: item?.taskId,
                user: session?.user.name,
                userEmail: session.user.email
            });

            const data = {
                id: docRef.id,
                created: new Date().toLocaleDateString(),
                comment: input,
                name: session?.user.name,
                email: session?.user.email,
                taskId: item?.taskId
            };

            setComments((prev) => [...prev, data]);
            setInput("");

        } catch (error) {
            console.error("Erro ao buscar tarefa:", error);
        }
    }

    async function handleDeleteComment(id: string) {
        // const docRef = doc(db, "comments", id);
        // await docRef.delete();
        // setComments(comments.filter((item) => item.id !== id));
    }

    return (
        <div className="min-h-screen flex justify-center items-start">
            <Head>
                <title>Detalhes da tarefa</title>
            </Head>
            <main className="w-full max-w-2xl p-6">
                <h1 className='text-black-700  text-gray-600 text-gray font-medium'>Detalhes da tarefa</h1>
                <div className='mt-4 text-sm text-gray-600'>
                    <span>Criada por: {item?.email} </span> <br />
                    <span>Data de criação: {item?.created}</span>
                </div>
                <div className='mt-4 flex flex-col justify-between items-start bg-gray-60 hover:bg-gray-100 transition'>
                    <p className='text-sm text-gray-600'>{item?.tarefa}</p>
                </div>
                <div className='mt-4 text-gray-600'>
                    <form className="flex flex-col gap-4 mb-6" onSubmit={handleComment}>
                        <label htmlFor="tarefa" className="text-gray-700 font-medium">
                            Digite um comentário
                        </label>
                        <Textarea
                            placeholder="Digite um comentário..."
                            value={input}
                            onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setInput(event.target.value)}
                        />
                        <button
                            type="submit"
                            className="w-full border-[5px] border-blue-600 bg-blue-600 text-white px-3 py-1 rounded-xl 
                                    transition-colors
                                    hover:bg-blue-700
                                    disabled:bg-gray-400 disabled:border-gray-400 disabled:cursor-not-allowed"
                            disabled={!session?.user}
                        >
                            Comentar
                        </button>

                    </form>
                </div>
                <ul className="space-y-3">
                    {comments.length === 0 && (
                        <p className="text-sm text-gray-600">Nenhum comentário ainda...</p>
                    )}
                    {comments.map((item) => (
                        <li key={item.id} className="flex flex-col justify-between items-start bg-gray-60 p-4 border border-gray-300 rounded-lg hover:bg-gray-100 transition">
                            <div className='text-sm text-gray-600 mb-2'>
                                <span>Comentado por: {item.name} </span>

                                {item.email === session?.user?.email && (
                                    <button
                                        className="text-red-500 hover:text-red-700 transition"
                                        aria-label="Remover tarefa"
                                        onClick={() => handleDeleteComment(item?.id)}
                                    >
                                        <FaTrash size={16} />
                                    </button>
                                )}

                                <p>Data: {item?.created}</p>
                                <p className='mt-2'>{item?.comment}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </main >
        </div >
    )
}


export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const id = params?.id as string;
    const docRef = doc(db, "tarefas", id);

    const q = query(
        collection(db, "comments"),
        where("taskId", "==", id),
        orderBy("created", "asc")  // ou "desc" para ordem decrescente
    );

    const commentsSnapshot = await getDocs(q);

    let allComments = [] as CommentProps[];

    commentsSnapshot.forEach((doc) => {
        const data = doc.data();

        const miliseconds = doc.data()?.created?.seconds * 1000;

        allComments.push({
            id: doc.id,
            created: new Date(miliseconds).toLocaleDateString(), // agora é string
            comment: data.comment || "",
            taskId: data.taskId || "",
            name: data.name || "Anônimo",
            email: data.userEmail || null,
        });
    });

    const snpshot = await getDoc(docRef);
    // console.log(snpshot.data())

    if (snpshot.data() === undefined) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    if (!snpshot.data()?.public) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    const miliseconds = snpshot.data()?.created?.seconds * 1000;

    const task = {
        tarefa: snpshot.data()?.tarefa ?? null,
        public: snpshot.data()?.public ?? false,
        created: new Date(miliseconds).toLocaleDateString(),
        email: snpshot.data()?.email ?? null,
        name: snpshot.data()?.name ?? null,
        taskId: id,
    }

    return {
        props: {
            item: task,
            allComments
        }
    }
}
