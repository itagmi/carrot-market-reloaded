export default function Home() {
  return (
    <main className="bg-gray-100 h-screen flex items-center justify-center p-5 sm:bg-red-100 md:bg-green-100 lg:bg-cyan-100 xl:bg-orange-100">
      <article className="bg-white shadow-lg rounded-3xl p-5 w-full max-w-screen-sm flex flex-col gap-2 md:flex-row *:outline-none has-[:invalid]:ring-red-100 ring ring-transparent transition-shadow">
        <input
          type="email"
          placeholder="Email address"
          className="w-full rounded-full h-10 bg-gray-200 pl-5 py-3 ring ring-transparent focus:ring-offset-2 transition-shadow placeholder:text-red-50 focus:ring-green-500 invalid:focus:ring-red-500 peer"
          required
        />
        <span className="text-red-500 font-medium hidden peer-invalid:block">Email is required.</span>
        <button className="bg-gradient-to-tr from-cyan-500 via-yellow-100 to-purple-400 text-white py-2 rounded-full active:scale-90 transition-transform font-medium focus:scale-90 md:px-10 peer-invalid:from-orange-100 peer-invalid:to-orange-100 peer-required:from-green-400 peer-required:to-green-400">
          Login
        </button>
      </article>
    </main>
  );
}
