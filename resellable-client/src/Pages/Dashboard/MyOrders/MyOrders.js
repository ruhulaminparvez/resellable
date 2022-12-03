import React, { useContext } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { AuthContext } from "../../../contexts/AuthProvider";

const queryClient = new QueryClient();

const MyOrders = () => {
    const { user } = useContext(AuthContext);


  const { data: users = [] } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await fetch(`https://reseller-red.vercel.app/bookings/${user.email}`);
      const data = await res.json();
      return data;
    },
  });

  return (
    <div>
      <h2 className="text-2xl font-bold mb-5">MyOrders</h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>ProductName</th>
              <th>ProductId</th>
              <th>Price</th>
              <th>Number Seller</th>
              <th>My Number</th>
              <th>Meeting Location</th>
              <th>Meeting Date</th>
              <th>Meeting Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr key={user._id}>
                <th>{i + 1}</th>
                <td>{user.productName}</td>
                <td>{user.productId}</td>
                <td>{user.price}</td>
                <td>{user.mobileSeller}</td>
                <td>{user.buyerMobile}</td>
                <td>{user.meetingLocation}</td>
                <td>{user.date}</td>
                <td>{user.time}</td>
                <td>
                  <button className="btn btn-xs btn-danger">Cancel</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default function Wraped() {
  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <MyOrders />
    </QueryClientProvider>
  );
}
