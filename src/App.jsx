import React from "react";
import { useState, useEffect } from "react";
import { X } from "lucide-react";

export const App = () => {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const submitHandler = (e) => {
    e.preventDefault();

    const copyTask = [...tasks];
    copyTask.push({ title, details });
    setTasks(copyTask);

    console.log(copyTask);

    console.log("Form Submitted");
    // console.log("Title:", title);
    // console.log("Details:", details);

    setTitle("");
    setDetails("");
  };

  const deleteNote = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  return (
    <div className="h-screen  text-[#141414] bg-[#FCF1E6] flex ">
      <form
        onSubmit={(e) => submitHandler(e)}
        className="flex items-start flex-col p-15 gap-5 w-1/2 border-r-3 border-gray-800"
      >
        <h1 className="text-2xl font-medium font-serif">📝 Quick Notes;</h1>

        {/* Heading Input */}
        <input
          className="h-12 w-full border-2 border-black rounded-lg px-5 py-2 outline-none font-medium"
          type="text"
          placeholder="Write the heading"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Details Input */}
        <textarea
          className="h-40 w-full border-2 border-black rounded-lg px-5 py-2 outline-none font-medium"
          placeholder="Write Your Notes Here"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        />

        {/* Submit Button */}
        <button
          disabled={!title.trim() || !details.trim()}
          className="w-full border border-gray-800 rounded-2xl bg-gray-800 text-white px-5 py-2 font-medium active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
        >
          Add Note
        </button>
      </form>
      <div className="w-1/2 p-15 bg-[#bc6c25] pt-15 overflow-y-auto">
        <h1 className="text-2xl font-medium font-serif text-gray-100">
          📒 Note's Listbook;
        </h1>
        <div className="flex items-start flex-wrap gap-2 mt-5">
          {tasks.map((elem, idx) => {
            return (
              <div
                key={idx}
                className="card h-52 w-40 rounded-lg bg-yellow-400 leading-tight overflow-y-auto no-scrollbar shadow-xl shadow-gray font-sans"
              >
                <div className="p-3 flex flex-col gap-1">
                  <h3
                    onClick={() => deleteNote(idx)}
                    className="text-black font-xs cursor-pointer"
                  >
                    <X size={16} strokeWidth={2} />
                  </h3>
                  <h3 className="text-lg font-medium text-black leading-tight break-words border-b-2 border-gray-800 pb-1">
                    {elem.title}
                  </h3>
                  <p className="text-black text-xs break-words">
                    {elem.details}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default App;
