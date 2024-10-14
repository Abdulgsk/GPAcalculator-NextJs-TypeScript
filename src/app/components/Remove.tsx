import { HiOutlineTrash } from "react-icons/hi2";
import useSubjectStore from '../store/subjectStore';

interface Props {
  subId: string;
}

const Remove: React.FC<Props> = ({ subId }) => {
  const incrementDeletionCount = useSubjectStore((state) => state.incrementDeletionCount);

  const handleDelete = async () => {
    const userConfirmed = window.confirm("Are you sure you want to Delete?");
    if (userConfirmed) {
      try {
        const response = await fetch(`/api/deleteSub`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ subId }),
        });

        if (response.ok) {
          console.log(`Subject with id ${subId} deleted successfully.`);
          incrementDeletionCount(); // This will trigger a rerender in FetchSubjects
        } else {
          console.error('Failed to delete subject');
        }
      } catch (error) {
        console.error('Error deleting subject:', error);
      }
    }
  };

  return (
    <button onClick={handleDelete}>
      <HiOutlineTrash size={18} />
    </button>
  );
};

export default Remove;