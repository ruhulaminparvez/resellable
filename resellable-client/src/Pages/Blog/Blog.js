import React, { useState, useEffect } from "react";
import BlogItem from './BlogItem';


const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("https://reseller-red.vercel.app/blogs")
      .then((res) => res.json())
      .then((data) => setBlogs(data));
  }, []);

  return (
    <div className="lg:px-56 bg-base-200 pb-20">
      <h1 className="text-3xl text-center font-bold py-10">Blogs</h1>

      <div className="flex justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-1 gap-10">
            {
                blogs.map(blog => <BlogItem key={blog._id} blog={blog}></BlogItem>)
            }
        </div>
      </div>
    </div>
  );
};

export default Blog;
