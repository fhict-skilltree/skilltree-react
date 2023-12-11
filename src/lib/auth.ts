
import {OAuthUserConfig} from "next-auth/providers";

export const TalentPulseOAuth = (options: OAuthUserConfig<Record<string, any>>): OAuthUserConfig<Record<string, any>> => {
    return {
        id: 'talentpulse',
        name: 'TalentPulse',
        type: 'oauth',
        version: '2.0',
        idToken: false,
        authorization: {
            url: "http://localhost:3004/auth/methods/oauth/authorize",
            // url: "https://api.talentpulse.localhost/auth/methods/oauth/authorize",
            params: {
                scope: null
            },
        },
        // token: "https://api.talentpulse.localhost/auth/methods/oauth/token",
        token: "http://localhost:3004/auth/methods/oauth/token",
        // userinfo: "https://api.talentpulse.localhost/auth/current-user",
        userinfo: "https://localhost:3004/auth/current-user",
        // token: {
        //     url: "https://api.talentpulse.localhost/auth/methods/oauth/token",
        //     async request(context) {
        //         console.log('#####')
        //         console.log(context)
        //         console.log('#####')
        //         // const tokens = await fetch(contex)
        //         return {  }
        //     }
        // },
        profile(profile) {
            return {
                id: profile.data.id,
                first_name: profile.data.first_name,
                last_name: profile.data.last_name,
                email: profile.data.email,
            }
        },
        checks: ['state'],
        options,
    }
}
