import { useDispatch } from "react-redux";
import { updateBookAsync } from "../../store/slice/booksSlice";
import TextInput from "../ui/TextInput";
import EditModal from "../modals/EditModal";
import DeleteBookModal from "./DeleteBookModal";

const EditBookModal = ({ bookId, bookTitle }) => {
  const dispatch = useDispatch();

  const onEdit = async (data) => {
    const formData = {
      title: data.title,
    };

    try {
      await dispatch(updateBookAsync({ bookId, formData })).unwrap();
    } catch (error) {
      console.error("編集に失敗しました", error);
    }
  };

  const inputForm = () => {
    return (
      <TextInput
        label="タイトル"
        placeholder="タイトルを入力してください。"
        name="title"
        required={true}
        maxLength={18}
        defaultValue={bookTitle}
      />
    );
  };

  const DeleteModal = () => {
    return <DeleteBookModal bookTitle={bookTitle} bookId={bookId} />;
  };

  return (
    <EditModal
      onEdit={onEdit}
      inputForm={inputForm}
      title="メモブック"
      DeleteModal={DeleteModal}
    />
  );
};

export default EditBookModal;
