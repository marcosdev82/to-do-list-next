import { GetServerSideProps } from 'next';
import Head from 'next/head';

import { db } from '@/services/firebaseConnection';
import {
    doc,
    collection,
    query,
    where,
    getDoc

} from 'firebase/firestore';

interface Task {
    taskId: string;
    created: string; // já vem formatada como string pelo toLocaleDateString
    public: boolean;
    tarefa: string;
    user: string;
}

interface TaskPageProps {
    task: Task;
}
export default function Task({ task }: TaskPageProps) {
    return (
        <div className=''>
            <Head>
                <title>Detalhes da tarefa</title>
            </Head>
            <main>
                <h1 className='text-black'>{task.tarefa}</h1>
            </main>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const id = params?.id as string;

    const docRef = doc(db, "tarefas", id);

    const snpshot = await getDoc(docRef);

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
        tarefa: snpshot.data()?.tarefa,
        public: snpshot.data()?.public,
        created: new Date(miliseconds).toLocaleDateString(),
        user: snpshot.data()?.user,
        taskId: id,
    }

    console.log(task);

    return {
        props: {
            task
        }
    }
}