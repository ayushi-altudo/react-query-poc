import React, { useState } from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import useDebounce from "../Hooks/useDebouncer";

const queryClient = new QueryClient();

export default function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Search />
      </QueryClientProvider>
    </>
  );
}

function SearchResult({ isLoading, data }) {
  return (
    <div className="container">
      <div className="row">
        {isLoading && (
          <div class="d-flex justify-content-center">
            <div class="spinner-border" role="status"></div>
          </div>
        )}

        {data &&
          data.users.map((user) => (
            <div className="col-md-3">
              <div className="card">
                <img src={user.image} className="card-img-top" alt="..." />
                <div className="card-body text-center">
                  <h5 className="card-title">
                    {user.firstName}
                    &nbsp;
                    {user.lastName}
                  </h5>
                  <p className="card-text">{user.email}</p>
                  <p className="card-text">{user.phone}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

const Search = () => {
  const [search, setSearch] = useState("");
  const debouncedSearchTerm = useDebounce(search, 200);

  const { data, isLoading } = useQuery({
    queryKey: ["search", debouncedSearchTerm],
    queryFn: () => {
      if (debouncedSearchTerm) {
        return fetch(
          `https://dummyjson.com/users/search?q=${debouncedSearchTerm}`
        ).then((res) => res.json());
      }
    },
    enabled: true,
    networkMode: "online",
    keepPreviousData: false,
    refetchOnMount: true,
    cacheTime: 5 * 60 * 1000,
  });

  return (
    <div className="container">
      <input
        type="search"
        className="search-box"
        placeholder="Search here..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <SearchResult isLoading={isLoading} data={data} />
    </div>
  );
};
