import { useEffect, useRef, useState } from "react";
import { css } from "@emotion/react";
import {
  formStyle,
  modalBackStyle,
  modalContainerStyle,
} from "../../styles/styles";
import { FormProvider, useForm } from "react-hook-form";
import useToast from "../../hooks/useToast";
import Button from "../ui/Button";
import AddButton from "../ui/AddButton";

const buttonContainerStyle = css`
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  margin-top: 20px;
`;

const AddModal = ({ title, onAdd, inputForm, isBook = false }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const methods = useForm();
  const bodyRef = useRef(document.body);
  const showToast = useToast();

  useEffect(() => {
    if (isModalOpen) {
      bodyRef.current.style.overflowY = "hidden";
    } else {
      bodyRef.current.style.overflow = "auto";
    }

    return () => {
      bodyRef.current.style.overflow = "auto";
    };
  }, [isModalOpen]);

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const closeModal = (e) => {
    if (e.target === e.currentTarget) {
      toggleModal();
    }
  };

  const onSubmit = async (data) => {
    try {
      await onAdd(data, methods);
      toggleModal();
      showToast(`${title}が追加されました`);
    } catch (error) {
      showToast(`${title}の追加に失敗しました`);
      console.error(`${title}の追加に失敗しました。`, error);
    }
  };

  return (
    <>
      <AddButton isBook={isBook} onClick={toggleModal} />
      {isModalOpen && (
        <div css={modalBackStyle} onClick={closeModal}>
          <div css={modalContainerStyle}>
            <h3>メモブックのフォーム</h3>
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)} css={formStyle}>
                 {inputForm(methods)}
                <div css={buttonContainerStyle}>
                  <Button type="submit" color="blue">
                    追加する
                  </Button>
                  <Button type="button" color="gray" onClick={toggleModal}>
                    キャンセル
                  </Button>
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
      )}
    </>
  );
};

export default AddModal;
