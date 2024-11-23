import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchJoke } from "./jokeSlice";

const App = () => {
  const [category, setCategory] = useState("");
  const joke = useSelector((state) => {
    return state.joke.joke;
  })

  const dispatch = useDispatch();

  const handleCategory = (e) => {
    setCategory(e.target.value);
  };

  const handleFetch = () => {
    dispatch(fetchJoke(category));
  };

  const isError = joke.startsWith("Error:");
  let errorMessage = "";
  let availableCategories = "";

  if (isError) {
    const splitMessage = joke.split("|||");
    errorMessage = splitMessage[0].trim();
    availableCategories = splitMessage[1]?.trim() || "";
  }

  return (
    <main className="h-screen flex justify-center items-center bg-gray-800">
      <section className="text-center mx-2 sm:w-3/4">
        <div className="mb-10 flex justify-center">
          <input className="px-2 py-1 rounded-s-md outline-none" value={category} onChange={handleCategory} type="text" placeholder="Input search text" />
          <button className="py-2 px-3 rounded-e-md bg-blue-600 text-white text-xs font-medium" onClick={handleFetch}>Get {category === "" ? "Random" : `from ${category}`}</button>
        </div>

        {isError ? (
          <div>
            <h1 className="text-red-500 text-xl">{errorMessage}</h1>
            <h1 className="text-white text-xl">{availableCategories}</h1>
          </div>
        ) : (
          <h1 className="text-white text-xl">{joke}</h1>
        )}
      </section>
    </main>
  );
}

export default App;