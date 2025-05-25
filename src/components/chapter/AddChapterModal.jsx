import { useDispatch } from "react-redux";
import { addChaptersAsync } from "../../store/slice/chaptersSlice";
import { useNavigate } from "react-router-dom";
import TextInput from "../ui/TextInput";
import AddModal from "../modals/AddModal";

const AddChapterModal = ({ bookId, toggleHumBergerMenu }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onAdd = async (data, methods) => {
    const formData = {
      chapter_title: data.title,
    };

    try {
      const response = await dispatch(
        addChaptersAsync({ bookId, formData })
      ).unwrap();
      toggleHumBergerMenu();
      methods.reset();
      navigate(`/${bookId}/${response._id}`);
    } catch (error) {
      console.error("チャプターの追加に失敗しました。", error);
    }
  };

  const inputForm = () => {
    return (
      <TextInput
        label="チャプター名"
        placeholder="チャプター名を入力してください。"
        name="title"
        required={true}
        maxLength={25}
      />
    );
  };

  return (
    <AddModal
      onAdd={onAdd}
      inputForm={inputForm}
      title="チャプター"
      isBook={false}
    />
  );
};

export default AddChapterModal;
