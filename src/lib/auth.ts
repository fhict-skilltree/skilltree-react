
import {OAuthUserConfig} from "next-auth/providers";

export const TalentPulseOAuth = (options: OAuthUserConfig<Record<string, any>>): OAuthUserConfig<Record<string, any>> => {
    return {
        id: 'talentpulse',
        name: 'TalentPulse',
        type: 'oauth',
        version: '2.0',
        idToken: false,
        authorization: {
            url: process.env.BACKEND_OAUTH_AUTHORIZATION_URL,
            params: {
                scope: null
            },
        },
        token: process.env.BACKEND_OAUTH_TOKEN_URL,
        userinfo: process.env.BACKEND_OAUTH_USER_INFO_URL,
        profile(profile) {
            return {
                id: profile.data.uuid,
                name: profile.data.first_name + ' ' + profile.data.last_name,
                email: profile.data.email,
            }
        },
        checks: ['state'],
        options,
    }
}
