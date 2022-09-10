import { getProviders, signIn } from 'next-auth/react';

const Signin = ({ providers }) => {
  return (
    <div className="flex justify-center gap-5 mt-20">
      <img
        src="https://cdn.cms-twdigitalassets.com/content/dam/help-twitter/en/twitter-tips/desktop-assets/ch-01/ch12findphone.png.twimg.1920.png"
        alt="twitter in phone"
        className="hidden md:block md:w-48 md:h-96 object-cover rotate-6"
      />

      <div className="flex flex-col items-center">
        <img
          className="w-36 object-cover"
          src="https://help.twitter.com/content/dam/help-twitter/brand/logo.png"
          alt="twitter logo"
        />
        <p className="text-sm italic my-10">
          This app is created for learning purposes
        </p>
        {Object.values(providers).map((provider) => (
          <button
            key={provider.id}
            className="bg-red-400 text-white px-4 py-2 rounded-md hover:bg-red-500"
            onClick={() => signIn(provider.id, { callbackUrl: '/' })}
          >
            Sign in with {provider.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Signin;

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
