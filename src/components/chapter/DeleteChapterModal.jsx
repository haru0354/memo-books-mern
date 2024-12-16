import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteChaptersAsync } from "../../store/slice/chaptersSlice";
import DeleteModal from "../modals/DeleteModal";

const DeleteChapterModal = ({ chapterTitle, bookId, chapterId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onDelete = async () => {
    try {
      const response = await dispatch(
        deleteChaptersAsync({ bookId, chapterId })
      ).unwrap();

      if (response.redirectedUrl) {
        navigate(`/${bookId}/${response.redirectedUrl}`);
      } else {
        navigate(`/${bookId}`);
      }
    } catch (error) {
      showToast("チャプターの削除に失敗しました。");
      console.error("チャプターの削除に失敗しました。", error);
    }
  };

  return (
    <DeleteModal
      onDelete={onDelete}
      deleteTitle={chapterTitle}
      infoTitle="チャプター"
    />
  );
};

export default DeleteChapterModal;
