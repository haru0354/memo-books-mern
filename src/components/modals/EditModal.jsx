import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { css } from "@emotion/react";
import { formStyle } from "../../styles/styles";
import useToast from "../../hooks/useToast";
import Button from "../../components/ui/Button";

const buttonContainerStyle = css`
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  margin-top: 20px;
`;

const EditModal = ({ title, onEdit, inputForm, DeleteModal }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const methods = useForm();
  const showToast = useToast();

  const toggleModal = () => {
    setIsEditModalOpen((prev) => !prev);
  };

  const onSubmit = async (data) => {
    try {
      await onEdit(data, methods);
      toggleModal();
      showToast(`${title}の編集が完了しました`);
    } catch (error) {
      showToast(`${title}の編集に失敗しました`);
      console.error(`${title}の編集に失敗しました`, error);
    }
  };

  return (
    <>
      <Button color="blue" onClick={toggleModal}>
        編集
      </Button>
      <Modal isOpen={isEditModalOpen} onClose={toggleModal}>
        <h3>本の編集</h3>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} css={formStyle}>
            {inputForm(methods)}
            <div css={buttonContainerStyle}>
              <Button type="submit" color="blue">
                保存する
              </Button>
              <Button color="gray" onClick={toggleModal}>
                キャンセル
              </Button>
            </div>
          </form>
        </FormProvider>
        {DeleteModal()}
      </Modal>
    </>
  );
};

export default EditModal;
