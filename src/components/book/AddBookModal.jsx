import { useDispatch } from "react-redux";
import { addBookAsync } from "../../store/slice/booksSlice";
import { useNavigate } from "react-router-dom";
import TextInput from "../ui/TextInput";
import AddModal from "../modals/AddModal";

const AddBookModal = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onAdd = async (data) => {
    const formData = {
      title: data.title,
      chapters: [
        {
          chapter_title: "チャプター1",
          contents: [],
        },
      ],
    };

    try {
      const response = await dispatch(addBookAsync({ formData })).unwrap();
      navigate(`/${response._id}/${response.chapters[0]._id}`);
    } catch (error) {
      console.error("メモブックの追加に失敗しました。", error);
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
      />
    );
  };

  return (
    <AddModal
      onAdd={onAdd}
      inputForm={inputForm}
      title="メモブック"
      isBook={true}
    />
  );
};

export default AddBookModal;
