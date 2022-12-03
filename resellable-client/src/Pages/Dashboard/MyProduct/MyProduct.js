import React, { useContext } from "react";
// import { Link } from 'react-router-dom';
import { AuthContext } from "../../../contexts/AuthProvider";

const MyProduct = () => {
  const [products, setProducts] = React.useState([]);
  const { user } = useContext(AuthContext);

  React.useEffect(() => {
    fetch(`https://reseller-red.vercel.app/products/${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
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
              <th>Product Name</th>
              <th>Status</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, i) => (
              <tr key={product._id}>
                <th>{i + 1}</th>
                <td>{product.user}</td>
                <td>{product.productName}</td>
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

export default MyProduct;
