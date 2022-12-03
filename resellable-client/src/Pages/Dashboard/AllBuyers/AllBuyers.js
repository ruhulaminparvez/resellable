import React from "react";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";

const queryClient = new QueryClient()

const AllBuyers = () => {
  const { data: buyer = [] } = useQuery({
    queryKey: ["buyer"],
    queryFn: async () => {
      const res = await fetch("https://reseller-red.vercel.app/users/buyer");
      const data = await res.json();
      return data;
    },
  });

  return (
    <div>
      <h2 className="text-2xl font-bold mb-5">All Sellers</h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {buyer.map((user, i) => (
              <tr key={user._id}>
                <th>{i + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button className="btn btn-xs btn-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default function Wraped(){
    return(<QueryClientProvider client={queryClient} contextSharing={true}>
            <AllBuyers/>
      </QueryClientProvider>
    );
  }
