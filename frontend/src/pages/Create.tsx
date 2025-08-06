import type React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
const Create = () => {
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [error, setError] = useState<string>("")
  const navigate = useNavigate();
  async function handleSubmit(e : React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:4000/api/notes/create', {title, content : description})
      const data = await res.data
      if(data.success) {
        navigate('/')
      }
    } catch (error:any) {
      if(error.response && error.response.data.error) {
        setError(error.response.data.error)
      }
    }
  }
  return (
    <div className="w-full max-w-xs">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder="Title"
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Content
          </label>
          <textarea
            className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            
            placeholder="Content...."
            onChange={e => setDescription(e.target.value)}
          />
        
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Create Note
          </button>
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </form>
       
    </div>
  );
};

export default Create;
