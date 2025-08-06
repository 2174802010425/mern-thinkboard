import axios from "axios";
import { PenSquareIcon, Trash2Icon } from "lucide-react";
import type React from "react";
import toast from "react-hot-toast";

import { Link} from "react-router";

interface NoteProps {
  note: {
    _id: string;
    title: string;
    content: string;
    createdAt: Date;
  };
  setNotes: any;
}

const NoteCard = ({ note, setNotes }: NoteProps) => {
  
  async function handleDelete(
    e: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) {
    e.preventDefault();
    const confirmed = window.confirm(
      "Are you sure you want to delete this note ?"
    );
    try {
      if (confirmed) {
        const res = await axios.delete(`http://localhost:4000/api/notes/${id}`);
        const data = await res.data;
        if (data.success) {
          setNotes((pre : any) => pre.filter((note :any) => note._id !== id))
          toast.success(data.success);
        } else {
          toast.error("Something went wrong, please try again");
        }
      }
    } catch (error: any) {
      toast.error(error);
    }
  }
  return (
    <Link
      to={`/note/${note._id}`}
      className="card bg-base-100 hover:shadow-lg transition-all duration-200 
      border-t-4 border-solid border-[#00FF9D]"
    >
      <div className="card-body bg-base-100 p-5 rounded">
        <h3 className="card-title text-base-content">{note.title}</h3>
        <p className="text-base-content/70 line-clamp-3">{note.content}</p>
        <div className="card-actions flex justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">
            {new Date(note.createdAt).toLocaleDateString("vi-VN")}
          </span>
          <div className="flex items-center gap-1">
            <PenSquareIcon className="size-4" />
            <button
              type="button"
              onClick={(e) => handleDelete(e, note._id)}
              className="btn btn-ghost btn-xs text-red-600"
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
