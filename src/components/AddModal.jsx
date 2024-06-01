import { useState } from "react";
import Button from "./ui/Button";
import TextInput from "./ui/TextInput";
import Textarea from "./ui/Textarea";

const AddModal = ({ isContents = false }) => {
  const [isAddModal, setIsAddModal] = useState(false);

  const toggleAddModal = () => {
    setIsAddModal((prev) => !prev);
  };

  const closeModal = (e) => {
    if (e.target === e.currentTarget) {
      toggleAddModal();
    }
  };

  return (
    <>
      <Button onClick={toggleAddModal}>
        +
      </Button>
      {isAddModal && (
        <div onClick={closeModal}>
          <div>
            <form>
              <TextInput
                label="タイトル"
                placeholder="タイトルを入力してください。"
              />
              {isContents && (
                <Textarea
                  label="コンテンツ"
                  placeholder="コンテンツを入力してください。"
                />
              )}
              <Button>追加する</Button>
            </form>
            <Button onClick={toggleAddModal}>
              キャンセル
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default AddModal;
