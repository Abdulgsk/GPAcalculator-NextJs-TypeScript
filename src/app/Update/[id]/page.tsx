import Edit from "@/app/components/Edit";

interface EditPageParams {
  id: string;
}

interface EditProps {
  params: EditPageParams;
}

const getTopicById = async (id: string) => {
  try {
    const res = await fetch(`/api/editSubjects/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch subject");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching subject", error);
    return null; // Return null in case of an error
  }
};

export default async function Update({ params }: EditProps) {
  const { id } = params;
  const data = await getTopicById(id);

  // If no data is returned, show an error message
  if (!data || !data.subject) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <h1>Error fetching subject</h1>
      </div>
    );
  }

  const { subject } = data;
  const { subName, grade, credit } = subject;

  return <Edit id={id} subName={subName} grade={grade} credit={credit} />;
}
