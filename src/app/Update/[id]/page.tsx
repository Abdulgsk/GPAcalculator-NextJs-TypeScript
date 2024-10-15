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
    });

    if (!res.ok) {
      throw new Error("Failed to fetch subject");
    }

    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching the subject", error ,id);
    return null; 
  }
};

export default async function Update({ params }: EditProps) {
  const { id } = params;
  const data = await getTopicById(id);

 
  // if (!data || !data.subject) {
  //   return (
  //     <div className="w-full h-full flex justify-center items-center text-gray-200">
  //       <h1>Error fetching subject {id}</h1>
  //     </div>
  //   );
  // }

  const { subject } = data;
  const { subName, grade, credit } = subject;

  return <Edit id={id} subName={subName} grade={grade} credit={credit} />;
}
