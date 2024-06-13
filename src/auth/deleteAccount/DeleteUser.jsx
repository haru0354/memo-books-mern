import { useDispatch, useSelector } from "react-redux";
import { deleteUserAsync } from "../../store/slice/userSlice";
import {
  errorMessageStyle,
  modalBackStyle,
  modalContainerStyle,
} from "../../styles/styles";
import AgainAuth from "./AgainAuth";
import Button from "../../components/ui/Button";
import { useState } from "react";
import { css } from "@emotion/react";
import { useToast } from "../../context/ToastContext";

const centerStyle = css`
  padding-top: 10px;
  padding-bottom: 10px;
  text-align: center;
`;

const buttonContainerStyle = css`
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  margin-top: 20px;
`;

const textRed = css`
  color: red;
  font-weight: 600;
`;

const DeleteUser = () => {
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const dispatch = useDispatch();
  const showToast = useToast();
  const { status, error, againAuth } = useSelector((state) => state.user);

  const toggleDeleteModal = () => {
    setIsDeleteModal((prev) => !prev);
  };

  const closeDeleteModal = (e) => {
    if (e.target === e.currentTarget) {
      setIsDeleteModal((prev) => !prev);
    }
  };

  const handleDeleteUser = () => {
    const result = dispatch(deleteUserAsync()).unwrap();
    if (deleteUserAsync.fulfilled.match(result)) {
      showToast("アカウントが削除されました");
    }
  };

  return (
    <>
      <div css={centerStyle}>
        <Button onClick={toggleDeleteModal} color="red">
          アカウントの削除
        </Button>
      </div>
      {isDeleteModal && (
        <div css={modalBackStyle} onClick={closeDeleteModal}>
          <div css={[modalContainerStyle, centerStyle]}>
            <p css={textRed}>「アカウントを本当に削除しますか？」</p>
            <p>削除するとデータの復元をすることはできません。</p>
            {againAuth ? (
              <AgainAuth handleDeleteUser={handleDeleteUser} />
            ) : (
              <div css={buttonContainerStyle}>
                <Button color="red" onClick={handleDeleteUser}>
                  アカウント削除
                </Button>
                <Button color="gray" onClick={toggleDeleteModal}>
                  キャンセル
                </Button>
              </div>
            )}
            {status === "loading" && <p>削除中</p>}
            {error && <p css={errorMessageStyle}>{error}</p>}
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteUser;
