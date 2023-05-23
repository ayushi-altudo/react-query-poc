/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import axios from "axios";

const queryClient = new QueryClient();

export default function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <FetchUsernames />
      </QueryClientProvider>
    </>
  );
}

function FetchUsernames() {
  const { isLoading, error, data } = useQuery("repoData", () =>
    axios.get("https://dummyjson.com/users").then((res) => res.data)
  );
  console.log(data, "res");
  if (isLoading)
    return (
      <div class="d-flex justify-content-center">
        <div class="spinner-border" role="status"></div>
      </div>
    );

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="container">
      <div className="row">
        <h2>All Users List</h2>
        {data.users.map((user) => (
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
        <ReactQueryDevtools initialIsOpen />
      </div>
    </div>
  );
}
