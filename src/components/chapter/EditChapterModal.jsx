import { useDispatch } from "react-redux";
import { updateChaptersAsync } from "../../store/slice/chaptersSlice";
import TextInput from "../ui/TextInput";
import DeleteChapterModal from "./DeleteChapterModal";
import EditModal from "../modals/EditModal";

const EditChapterModal = ({ bookId, chapterId, chapterTitle }) => {
  const dispatch = useDispatch();

  const onEdit = async (data) => {
    const formData = {
      chapter_title: data.title,
    };

    try {
      await dispatch(
        updateChaptersAsync({ bookId, chapterId, formData })
      ).unwrap();
    } catch (error) {
      console.error("チャプターの編集に失敗しました", error);
    }
  };

  const inputForm = () => {
    return (
      <TextInput
        label="チャプター名"
        placeholder="チャプター名を入力してください。"
        name="title"
        defaultValue={chapterTitle}
        required={true}
        maxLength={16}
      />
    );
  };

  const DeleteModal = () => {
    return (
      <DeleteChapterModal
        chapterTitle={chapterTitle}
        chapterId={chapterId}
        bookId={bookId}
      />
    );
  };

  return (
    <EditModal
      onEdit={onEdit}
      inputForm={inputForm}
      title="チャプター"
      DeleteModal={DeleteModal}
      iconDesign={true}
    />
  );
};

export default EditChapterModal;
