import Image from "next/image";
import hero from "./../../public/imagem-tarefas.png";
import Head from "next/head";

export default function Home() {
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
          <span>+12 Posts</span>
          <span>+90 Comentários</span>
        </div>
      </main>
    </div>
  );
}
