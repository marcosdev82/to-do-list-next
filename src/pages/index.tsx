import Image from "next/image";
import hero from "./../../public/imagem-tarefas.png";
import Head from "next/head";
import { GetStaticProps } from "next";

import { db } from "../services/firebaseConnection";

import { collection, getDocs } from "firebase/firestore";

interface HomeProps {
  posts: number;
  comments: number;
}

export default function Home({ posts, comments }: HomeProps) {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">

      <Head>
        <title>Organizador de tarefas</title>
      </Head>

      <main className="w-full flex flex-col items-center justify-center text-center px-6 py-12">
        <Image
          src={hero}
          alt="Gerenciador de tarefas"
          width={400}
          height={200}
          className="rounded-xl mb-6"
          priority
        />
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 max-w-2xl">
          Aumente sua produtividade com um sistema prático e intuitivo para
          gerenciar suas atividades do dia a dia.
        </h1>

        <div className="flex flex-col md:flex-row gap-2 mt-6 text-gray-600 font-medium">
          <span>+{posts} Posts</span>
          <span>+{comments} Comentários</span>
        </div>
      </main>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {

  const tarefasRef = collection(db, "tarefas");
  const commentsRef = collection(db, "comments");

  const tarefasSnapshot = await getDocs(tarefasRef);
  const commentsSnapshot = await getDocs(commentsRef);

  return {
    props: {
      posts: tarefasSnapshot.size || 0,
      comments: commentsSnapshot.size || 0
    },
    revalidate: 60, // 1 minuto
  };
};  
