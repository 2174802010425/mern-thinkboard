import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitUi";
import axios from "axios";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard";

interface NoteProps {
  _id : string;
  title : string;
  content : string
  createdAt : Date
}
const Home = () => {
  const [isRateLimited, setIsRateLimited] = useState<boolean>(true);
  const [notes, setNotes] = useState<NoteProps[]>([]);

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getNotes = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:4000/api/notes");
        const data = await res.data.success;

        setLoading(false);
        setNotes(data);
        setIsRateLimited(false);
      } catch (error: any) {
        console.log(error);
        if (error.response.status === 429) {
          setIsRateLimited(true);
          toast.error(error.response.data.error);
        } else {
          toast.error("Failed to load notes");
        }
      }
    };
    getNotes();
  }, []);
  return (
    <div className="min-h-screen">
      <Navbar />
      {isRateLimited && <RateLimitedUI />}
      <div className="max-w-7xl max-auto p-4 mt-6">
        {loading && <div className="text-center text-primary py-10">Loading...</div>}
        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map(note => (
              <NoteCard key={note._id} note={note} setNotes={setNotes}/>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
