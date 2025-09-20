import NextAuth, { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";

// Verifica se as variáveis de ambiente estão definidas
if (!process.env.GITHUB_ID || !process.env.GITHUB_SECRET || !process.env.NEXTAUTH_SECRET) {
  throw new Error(
    "As variáveis GITHUB_ID, GITHUB_SECRET e NEXTAUTH_SECRET devem estar definidas!"
  );
}

export const authOptions: NextAuthOptions = {
  // Provedores de login
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],

  // Chave secreta para criptografia da sessão
  secret: process.env.NEXTAUTH_SECRET,

  // // Ativa logs detalhados
  // debug: true,

  // // Configurações da sessão
  // session: {
  //   strategy: "jwt", // Use JWT para sessões
  // },

  // // Callbacks opcionais podem ser adicionados aqui
  // callbacks: {
  //   async jwt({ token }) {
  //     return token;
  //   },
  //   async session({ session, token }) {
  //     return session;
  //   },
  // },
};

export default NextAuth(authOptions);
