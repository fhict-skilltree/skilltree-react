import NextAuth, {getServerSession, NextAuthOptions} from "next-auth"
import {TalentPulseOAuth} from "@/lib/auth";
import {GetServerSidePropsContext, NextApiRequest, NextApiResponse} from "next";

export const authOptions: NextAuthOptions = {
    providers: [
        TalentPulseOAuth({
            clientId: process.env.BACKEND_OAUTH_CLIENT_ID,
            clientSecret: process.env.BACKEND_OAUTH_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async jwt({token, account, profile}) {
            if (account) {
                token.accessToken = account.access_token
            }

            return token
        },
        async session({ session, token, user }) {
            session.accessToken = token.accessToken

            return session
        }
    },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

export function auth(...args: [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]] | [NextApiRequest, NextApiResponse] | []) {
    return getServerSession(...args, authOptions)
}