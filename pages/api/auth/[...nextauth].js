import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLINT_ID,
      clientSecret: process.env.GOOGLE_CLINT_SECRET,
    }),
  ],

  // If you want to create custom signin page
  pages: {
    signIn: '/auth/signin',
  },

  secret: process.env.SECRET,

  // If you need to return additional data in the session object
  callbacks: {
    async session({ token, session }) {
      session.user.userName = session.user.name
        .split(' ')
        .join('')
        .toLocaleLowerCase();
      session.user.id = token.sub;
      return session;
    },
  },
});
