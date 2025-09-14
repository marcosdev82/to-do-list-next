import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

export const authOptions = {
  // Provedores de login
    providers: [
    GitHubProvider({
        clientId: process.env.GITHUB_ID as string,
        clientSecret: process.env.GITHUB_SECRET as string,
    }),
    ],
    // Chave secreta para criptografia da sessão
    secret: process.env.NEXTAUTH_SECRET as string,
    // Configurações da sessão
};

export default NextAuth(authOptions);
