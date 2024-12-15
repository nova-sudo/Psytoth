import React, { useEffect, useState } from "react";

const JournalEntries = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetchEntries = async () => {
      const res = await fetch("http://localhost:5050/api/journal", {
        method: "GET",
      });
      const data = await res.json();
      setEntries(data);
    };

    fetchEntries();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col  items-center p-10">
      <h1 className="text-8xl font-bold font-aqem mb-16">My Journal Entries</h1>
      {entries.length > 0 ? (
        <ul className="w-full max-w-4xl space-y-4 ">
          {entries.map((entry) => (
            <li key={entry._id} className="p-4 font-pixel bg-white rounded-3xl shadow">
              <h2 className="font-semibold">
                {new Date(entry.date).toLocaleString()}
              </h2>
              <p className="font-wild text-lg ">{entry.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No entries found.</p>
      )}
    </div>
  );
};

export default JournalEntries;
