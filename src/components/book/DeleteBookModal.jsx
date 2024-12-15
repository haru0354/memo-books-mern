import { useDispatch } from "react-redux";
import { deleteBookAsync } from "../../store/slice/booksSlice";
import DeleteModal from "../modals/DeleteModal";

const DeleteBookModal = ({ bookTitle, bookId }) => {
  const dispatch = useDispatch();

  const onDelete = async () => {
    try {
      await dispatch(deleteBookAsync({ bookId })).unwrap();
    } catch (error) {
      showToast("メモブックの削除に失敗しました。");
      console.error("メモブックの削除に失敗しました。", error);
    }
  };

  return (
    <DeleteModal
      onDelete={onDelete}
      deleteTitle={bookTitle}
      infoTitle="メモブック"
    />
  );
};

export default DeleteBookModal;
