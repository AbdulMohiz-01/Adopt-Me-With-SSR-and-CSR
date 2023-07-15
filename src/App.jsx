// App.jsx
import { useState, lazy, Suspense } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AdoptedPetContext from "./AdoptedPetContext.js";
import Loading from "./Loading.jsx";

const Details = lazy(() => import("./Details.jsx"));
const SearchParams = lazy(() => import("./SearchParams.jsx"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
      suspense: true,
    },
  },
});

const App = () => {
  const adoptedPetHook = useState(null);
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<Loading />}>
          <AdoptedPetContext.Provider value={adoptedPetHook}>
            <header className="w-full mb-10 bg-gradient-to-b from-yellow-400 via-orange-500 to-red-500 p-7 text-center">
              <Link className="text-6xl text-white hover:text-gray-200" to="/">
                Adopt Me!
              </Link>
            </header>
            <Routes>
              <Route path="/" element={<SearchParams />} />
              <Route path="/details/:id" element={<Details />} />
            </Routes>
          </AdoptedPetContext.Provider>
        </Suspense>
      </QueryClientProvider>
    </div>
  );
};

export default App;
