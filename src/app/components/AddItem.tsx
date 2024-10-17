"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import useSubjectStore from '../store/subjectStore';

export default function AddItems() {
    const searchParams = useSearchParams();
    const [semId, setSemId] = useState<string | null>(null); // Store userId in state

    const [subject, setSubject] = useState("");
    const [grade, setGrade] = useState("");
    const [credits, setCredits] = useState("");
    const [loading, setLoading] = useState("Add Subject");

    const incrementAdditionCount = useSubjectStore((state) => state.incrementAdditionCount);

    useEffect(() => {
        setSemId(searchParams.get("semId"));
    }, [searchParams]); // Only set userId when searchParams change

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading("Adding Subject...");

        const validGrades = ["O", "o", "A", "a", "A+", "a+", "B", "b", "B+", "b+", "C", "c", "C+", "c+"];
        const creditsNumber = parseInt(credits, 10);

        if (subject === "" || grade === "" || credits === "" || !semId) {
            alert("All fields must be filled out");
            setLoading("Add Subject");
            return;
        }
        if (!validGrades.includes(grade)) {
            alert("Invalid grade. Must be one of: O, A, A+, B, B+, C, C+");
            setLoading("Add Subject");
            return;
        }
        if (isNaN(creditsNumber) || creditsNumber < 1 || creditsNumber > 4) {
            alert("Credits must be a number between 1 and 4");
            setLoading("Add Subject");
            return;
        }

        try {
            const res = await fetch("/api/addSubjects", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ subject, grade, credits: creditsNumber, semId }),
            });
            if (!res.ok) {
                throw new Error("Failed to add Subject");
            }

            incrementAdditionCount();
            setSubject("");
            setGrade("");
            setCredits("");
            setLoading("Add Subject");
        } catch (error) {
            console.log("Error loading Subjects: ", error);
            setLoading("Add Subject");
        }
    };

    return (
        <form className="flex flex-col justify-center items-start w-3/4" onSubmit={handleSubmit}>
            <div className="flex flex-row justify-between items-center w-full mb-4">
                <p className="mb-1 text-lg font-bold text-gray-200 w-1/3">Subject</p>
                <input
                    className="border h-10 text-white rounded-md bg-transparent px-2 w-2/3"
                    placeholder="Subject Name"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                />
            </div>

            <div className="flex flex-row justify-between items-center w-full mb-4">
                <p className="mb-1 text-lg font-bold text-gray-200 w-1/3">Grade</p>
                <input
                    className="border h-10 text-white rounded-md bg-transparent px-2 w-2/3"
                    placeholder="Grade"
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                />
            </div>

            <div className="flex flex-row justify-between items-center w-full mb-4">
                <p className="mb-1 text-lg font-bold text-gray-200 w-1/3">Credits</p>
                <input
                    className="border h-10 text-white rounded-md bg-transparent px-2 w-2/3"
                    placeholder="Credits"
                    value={credits}
                    onChange={(e) => setCredits(e.target.value)}
                />
            </div>

            <button
                type="submit" // Use type="submit" to avoid manual onClick
                className="mb-3 text-gray-900 bg-gradient-to-r w-3/4 from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-md text-sm px-5 py-2.5 text-center me-2"
            >
                {loading}
            </button>
        </form>
    );
}
