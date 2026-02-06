import { Link } from 'react-router-dom';
function Home() {
  return (
    <div
      className="
        h-screen w-full
        flex flex-col justify-between
        pt-8
        bg-cover bg-center
        bg-[url('https://plus.unsplash.com/premium_photo-1731842686156-74895c29a87b?q=80&w=986&auto=format&fit=crop')]
      "
    >
      <img
        className="w-16 ml-8"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt="Uber logo"
      />

      <div className="bg-white pb-7 py-4 px-4">
        <h2 className="text-3xl font-bold">
          Get Started With Uber
        </h2>

        <Link
          to="/login"
          className="flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5"
        >
          Continue
        </Link>
      </div>
    </div>
  );
}

export default Home;

