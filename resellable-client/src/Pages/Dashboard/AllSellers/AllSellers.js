import React from "react";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";

const queryClient = new QueryClient()

const AllSellers = () => {
  const { data: seller = [] } = useQuery({
    queryKey: ["seller"],
    queryFn: async () => {
      const res = await fetch("https://reseller-red.vercel.app/users/seller");
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
            {seller.map((seller, i) => (
              <tr key={seller._id}>
                <th>{i + 1}</th>
                <td>{seller.name}</td>
                <td>{seller.email}</td>
                <td>{seller.role}</td>
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
            <AllSellers/>
      </QueryClientProvider>
    );
  }
