import { useDispatch } from "react-redux";
import { deleteContentsAsync } from "../../store/slice/contentsSlice";
import DeleteModal from "../modals/DeleteModal";

const DeleteContentModal = ({
  contentTitle,
  bookId,
  chapterId,
  contentId,
  toggleEditContents,
}) => {
  const dispatch = useDispatch();

  const onDelete = async () => {
    try {
      await dispatch(
        deleteContentsAsync({ bookId, chapterId, contentId })
      ).unwrap();
      toggleEditContents(contentId);
    } catch (error) {
      showToast("メモの削除に失敗しました");
      console.error("メモの削除に失敗しました。");
    }
  };

  return <DeleteModal onDelete={onDelete} deleteTitle={contentTitle} />;
};

export default DeleteContentModal;
