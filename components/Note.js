"use client";

import React, { useState } from "react";

import axios from "axios";
import { useRouter } from "next/navigation";

const Note = ({ note }) => {
  const router = useRouter();
  const [visibility, setVisibility] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState(note);

  const editForm = () => {
    setVisibility((visibility) => !visibility);
  };
  const handleEditSubmit = (e) => {
    axios
      .patch(`/api/post/${note.id}`, noteToEdit)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        router.refresh();
      });
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setNoteToEdit((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleDeleteNote = (id) => {
    axios
      .delete(`/api/post/${id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        router.refresh();
      });
  };

  return (
    <div>
      <li className="card w-80 bg-base-100 text-primary-content" key={note.id}>
        <div className="card-body">
          <h2 className="card-title">{note.title}</h2>
          <p>{note.description}</p>
        </div>
        <div className="pt-5">
          <button
            className="mr-3 btn btn-sm bg-success ml-3 rounded-md text-center"
            onClick={(e) => editForm()}
          >
            Edit
          </button>
          <button
            onClick={() => handleDeleteNote(note.id)}
            className="mr-3 text-white btn btn-sm mb-3 bg-red-600 rounded-md text-center"
          >
            Delete
          </button>

          {visibility && (
            <div>
              <h2 className="text-center">Update Note</h2>
              <form
                onSubmit={handleEditSubmit}
                className="p-4 bg-warning mt-1 rounded-lg flex-col"
              >
                <div>
                  <input
                    value={noteToEdit.title || ""}
                    onChange={handleChange}
                    className="p-4 w-full outline-none"
                    type="text"
                    id="title"
                  />
                </div>
                <div>
                  <input
                    value={noteToEdit.description || ""}
                    onChange={handleChange}
                    name="description"
                    className="p-4 w-full mt-3 outline-none"
                    type="text"
                    id="description"
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-sm mr-3 bg-lime-700 mt-2 p-2 rounded-md"
                >
                  Update
                </button>
                <button
                  onClick={() => setVisibility((visibility) => !visibility)}
                  className="btn btn-sm mr-3 bg-rose-600 mt-2 p-2 rounded-md"
                >
                  Cancel
                </button>
              </form>
            </div>
          )}
        </div>
      </li>
    </div>
  );
};

export default Note;
