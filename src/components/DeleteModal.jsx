import { useState } from "react";
import Button from "./ui/Button";

const DeleteModal = ({ guidance, title }) => {
  const [isDeleteModalOpen, setIdDeleteModalOpen] = useState(false);
  const toggleDeleteModal = () => {
    setIdDeleteModalOpen((prev) => !prev);
  };

  const closeModal = (e) => {
    if (e.target === e.currenTarget) {
      toggleDeleteModal();
    }
  };

  return (
    <>
      <Button onClick={toggleDeleteModal}>
        削除
      </Button>
      {isDeleteModalOpen && (
        <div onClick={closeModal}>
          <div>
            <p>「{title}」を削除しますか？</p>
            {guidance && <p>「{guidance}」の中見も全て削除されます。</p>}
            <p>削除すると復元することはできません。</p>
            <Button>削除</Button>
            <Button onClick={toggleDeleteModal}>キャンセル</Button>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteModal;
