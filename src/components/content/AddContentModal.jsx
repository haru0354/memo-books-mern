import { useDispatch } from "react-redux";
import { addContentsAsync } from "../../store/slice/contentsSlice";
import Textarea from "../ui/Textarea";
import TextInput from "../ui/TextInput";
import AddModal from "../modals/AddModal";

const AddContentModal = ({ bookId, chapterId }) => {
  const dispatch = useDispatch();

  const onAdd = async (data, methods) => {
    const formData = {
      heading_title: data.title,
      content: data.content,
    };

    try {
      await dispatch(
        addContentsAsync({ bookId, chapterId, formData })
      ).unwrap();
      methods.reset();
    } catch (error) {
      console.error("メモの追加に失敗しました。", error);
    }
  };

  const inputForm = () => {
    return (
      <>
        <TextInput
          label="タイトル"
          placeholder="タイトルを入力してください。"
          name="title"
          required={true}
          maxLength={25}
        />
        <Textarea
          label="コンテンツ"
          placeholder="コンテンツを入力してください。"
          name="content"
          required={true}
        />
      </>
    );
  };

  return <AddModal onAdd={onAdd} inputForm={inputForm} title="コンテンツ" />;
};

export default AddContentModal;
