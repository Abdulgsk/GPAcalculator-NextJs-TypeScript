"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import useSubjectStore from '../store/subjectStore';

export default function AddItems() {
    const searchParams = useSearchParams();
    const [userId, setUserId] = useState<string | null>(null); 

    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState("Add Title");

    const incrementAdditionCount = useSubjectStore((state) => state.incrementAdditionCount);

    useEffect(() => {
        setUserId(searchParams.get("userId"));
    }, [searchParams]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading("Adding Title..");


        if (title === "" || !userId) {
            alert("All fields must be filled out");
            setLoading("Add Title");
            return;
        }
        try {
            const res = await fetch("/api/addSemster", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title , userId }),
            });
            if (!res.ok) {
                throw new Error("Failed to add Title");
            }

            incrementAdditionCount();
            setTitle("");
            setLoading("Add Title");
        } catch (error) {
            console.log("Error loading Title: ", error);
            setLoading("Add Title");
        }
    };

    return (
        <form className="flex flex-col justify-center items-start w-3/4" onSubmit={handleSubmit}>
            <div className="flex flex-row justify-between items-center w-full mb-4">
                <p className="mb-1 text-lg font-bold text-gray-200 w-1/3">Title</p>
                <input
                    className="border h-10 text-white rounded-md bg-transparent px-2 w-2/3"
                    placeholder="Add Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <button
                type="submit" 
                className="mb-3 text-gray-900 bg-gradient-to-r w-3/4 from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-md text-sm px-5 py-2.5 text-center me-2"
            >
                {loading}
            </button>
        </form>
    );
}
