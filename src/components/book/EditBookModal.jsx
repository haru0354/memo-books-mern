import { useDispatch } from "react-redux";
import { updateBookAsync } from "../../store/slice/booksSlice";
import { errorMessageStyle } from "../../styles/styles";
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

  const inputForm = (methods) => {
    return (
      <>
        <TextInput
          label="タイトル"
          placeholder="タイトルを入力してください。"
          name="title"
          required={true}
          maxLength={18}
          defaultValue={bookTitle}
        />
        {methods.formState.errors.title && (
          <p css={errorMessageStyle}>
            {methods.formState.errors.title.message}
          </p>
        )}
      </>
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
