import React, { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";

const MyBuyers = () => {
  const [buyers, setBuyers] = React.useState([]);
  const { user } = useContext(AuthContext);

  React.useEffect(() => {
    fetch(`https://reseller-red.vercel.app/bookings/seller/${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setBuyers(data);
      });
  }, [user?.email]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-5">My Products</h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Email</th>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Status</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {buyers.map((buyer, i) => (
              <tr key={buyer._id}>
                <th>{i + 1}</th>
                <td>{buyer.user}</td>
                <td>{buyer.productId}</td>
                <td>{buyer.productName}</td>
                <td>Not Paid</td>
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

export default MyBuyers;
