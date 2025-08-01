import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserAsync, logout } from "../../store/slice/userSlice";
import {
  errorMessageStyle,
  modalBackStyle,
  modalContainerStyle,
  buttonContainerStyle,
} from "../../styles/styles";
import { useNavigate } from "react-router-dom";
import { css } from "@emotion/react";
import AgainAuth from "./AgainAuth";
import useToast from "../../hooks/useToast";
import Button from "../../components/ui/Button";

const centerStyle = css`
  padding-top: 10px;
  padding-bottom: 10px;
  text-align: center;
`;

const textRed = css`
  color: red;
  font-weight: 600;
`;

const DeleteUser = () => {
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const dispatch = useDispatch();
  const showToast = useToast();
  const navigate = useNavigate();
  const { status, error, againAuth } = useSelector((state) => state.user);

  const toggleDeleteModal = () => {
    setIsDeleteModal((prev) => !prev);
  };

  const closeDeleteModal = (e) => {
    if (e.target === e.currentTarget) {
      setIsDeleteModal((prev) => !prev);
    }
  };

  const handleDeleteUser = async () => {
    try {
      const result = await dispatch(deleteUserAsync()).unwrap();
      if (result === "アカウントが削除されました。") {
        showToast("アカウントが削除されました");
        await dispatch(logout()).unwrap();
        navigate("/");
      }
    } catch (error) {
      if (error === "再認証が必要です") {
        showToast("再認証が必要です");
      } else {
        showToast("アカウントの削除に失敗しました。");
        console.error("パスワードの変更に失敗しました。", error);
      }
    }
  };

  return (
    <>
      <div css={centerStyle}>
        <Button type="button" onClick={toggleDeleteModal} color="red">
          アカウントの削除
        </Button>
      </div>
      {isDeleteModal && (
        <div css={modalBackStyle} onClick={closeDeleteModal}>
          <div css={[modalContainerStyle, centerStyle]}>
            <p css={textRed}>「アカウントを本当に削除しますか？」</p>
            <p>削除するとデータの復元をすることはできません。</p>
            <AgainAuth handleDeleteUser={handleDeleteUser} />
            <Button type="button" color="gray" onClick={toggleDeleteModal}>
              キャンセル
            </Button>
            {status === "loading" && <p>削除中</p>}
            {error && <p css={errorMessageStyle}>{error}</p>}
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteUser;
