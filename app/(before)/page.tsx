export default function Home() {
  return (
    <main className="bg-gray-100 h-screen flex flex-col items-center justify-center p-5 sm:bg-red-100 md:bg-green-100 lg:bg-cyan-100 xl:bg-orange-100 gap-10">
      <article className="bg-white shadow-lg rounded-3xl p-5 w-full max-w-screen-sm flex flex-col gap-4">
        {["mini", "you", "nico", "Yourself", ""].map((person, index) => (
          <div
            key={index}
            className="flex items-center gap-5 odd:bg-gray-100 even:bg-cyan-50 p-2.5 rounded-xl border-b-2 last:border-0 group"
          >
            <div className="size-10 bg-blue-400 rounded-full" />
            <span className="text-lg font-medium empty:w-24 empty:h-5 empty:rounded-full empty:animate-pulse empty:bg-gray-300 group-hover:text-red-500">
              {person}
            </span>
            <div className="size-6 animate-bounce bg-red-500 text-white flex items-center justify-center rounded-full relative">
              <span className="z-10">{index}</span>
              <div className="size-6 bg-red-500 rounded-full absolute animate-ping" />
            </div>
            <span className="animate-spin">⌛</span>
            {/* loading skeleton */}
            {/* <div className="flex items-center gap-2 *:animate-pulse">
              <div className="size-10 bg-blue-400 rounded-full" />
              <div className="size-10 w-40 h-4 rounded-full bg-gray-400" />
              <div className="size-10 w-20 h-4 rounded-full bg-gray-400" />
            </div> */}
          </div>
        ))}
      </article>
      <article className="bg-gray-300 w-full max-w-screen-sm flex flex-col rounded-3xl p-5 group">
        <input type="text" placeholder="Write ur email"/>
        <a href="" className="text-bigger-hello">wwww.naver.com</a>
        <span className="group-focus-within:block hidden">Make sure it is a valid email</span>
        <button className="btn">submit</button>
      </article>
    </main>
  );
}
