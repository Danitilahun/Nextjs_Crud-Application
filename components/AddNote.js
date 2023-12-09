"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const AddNote = () => {
  const router = useRouter();
  const [inputs, setInputs] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/post", inputs)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setInputs({});
        router.refresh();
      });
  };
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <section className="bg-white mt-6 p-4 rounded-lg">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <h1 className="text-2xl pb-3 text-center">Add New Note</h1>

        <input
          type="text"
          placeholder="Title"
          name="title"
          className="input input-bordered input-sm w-full max-w-md m-auto"
          value={inputs.title || ""}
          onChange={handleChange}
        />

        <input
          type="text"
          placeholder="Description"
          name="description"
          className="input input-bordered input-sm w-full max-w-md m-auto "
          value={inputs.description || ""}
          onChange={handleChange}
        />

        <button type="submit" className="btn btn-warning max-w-md m-auto">
          Submit
        </button>
      </form>
    </section>
  );
};

export default AddNote;
