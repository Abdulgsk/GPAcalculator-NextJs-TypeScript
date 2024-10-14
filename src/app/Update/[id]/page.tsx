import Edit from "@/app/components/Edit";


interface EditPageParams {
    id: string;
  }
  
  interface EditProps {
    params: EditPageParams;
  }
  

  const getTopicById = async(id : string) => {
    try {
        const res = await fetch(`/api/editSubjects/${id}`,{
            cache:"no-store"
        },)

        if(!res.ok)
        {
            throw new Error("Faild to fetch subject");
        }

        return res.json();

    } catch (error) {
        console.log("Error Fetching Subject",error);
    }
  }

export default async function Update({params}: EditProps) {

    const {id} = params;
    const {subject} = await getTopicById(id);

    if (!subject) {
        return <div className="w-full h-full flex justify-center items-center"><h1>Error fetching subject</h1></div>; 
      }
    const { subName  , grade , credit} = subject;
    return(
        <Edit id={id} subName={subName} grade={grade} credit={credit}/>
    )
}