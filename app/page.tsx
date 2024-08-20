export default function Home() {
  return (
    <main className="bg-gray-100 h-screen flex items-center justify-center p-5 dark:bg-gray-700">
      <article className="bg-white shadow-lg rounded-3xl p-5 w-full max-w-screen-sm dark:bg-gray-600">
        <div className="flex justify-between items-center">
          <ul>
            <li className="text-gray-600 font-semibold -mb-1 dark:text-gray-300">
              In tarnsit
            </li>
            <li className="text-4xl font-semibold dark:text-white">
              Coollblue
            </li>
          </ul>
          <div className="size-12 rounded-full bg-orange-400" />
        </div>
        <div className="my-2 flex items-center gap-2">
          <span className="bg-green-400 text-white uppercase px-2.5 py-1.5 text-xs font-medium rounded-full hover:bg-green-500 hover:scale-125 transition">
            TODAY
          </span>
          <span className="dark:text-gray-100">9:30 - 10:30u</span>
        </div>
        <article className="relative">
          <div className="bg-gray-200 w-full h-2 rounded-full absolute" />
          <div className="bg-green-400 w-2/3 h-2 rounded-full absolute" />
        </article>
        <ul className="flex justify-between items-center mt-5 text-gray-600 dark:text-gray-300">
          <li>Expected</li>
          <li>Sorting center</li>
          <li>In transit</li>
          <li className="text-gray-400 dark:text-gray-500">Delivered</li>
        </ul>
      </article>
    </main>
  );
}
