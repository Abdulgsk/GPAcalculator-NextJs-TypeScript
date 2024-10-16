
import Edit from "@/app/components/Edit";

interface EditPageParams {
  id: string;
}

interface EditProps {
  params: EditPageParams;
}
const getTopicById = async (id: string) => {
  try {
    const res = await fetch(`/api/editSubjects/${encodeURIComponent(id)}`, {
      cache: "no-store",
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });

    if (!res.ok) {
      if (res.status === 404) {
        throw new Error("Subject not found");
      }
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    console.log(data, "Fetched data");
    return data;
  } catch (error) {
    console.error("Error fetching the subject", error, id);
    throw error; // Re-throw the error to be handled by the caller
  }
};
export default async function Update({ params }: EditProps) {
  const { id } = params;
  console.log(id, "ID passed to Update page");

  try {
    // Await the fetch operation
    const data = await getTopicById(id);

    // Ensure data and subject exist
    if (!data || !data.subject) {
      throw new Error("Subject data is missing");
    }

    const { subject } = data;
    const { subName, grade, credit } = subject;

    return <Edit id={id} subName={subName} grade={grade} credit={credit} />;
  } catch (error) {
    console.error("Error in Update component:", error);
    return (
      <div className="w-full h-full flex justify-center items-center text-gray-200">
        <h1>Error: {(error as Error).message || `Failed to fetch subject ${id}`}</h1>
      </div>
    );
  }
}
