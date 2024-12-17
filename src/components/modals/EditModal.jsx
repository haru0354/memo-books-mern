import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { formStyle, buttonContainerStyle } from "../../styles/styles";
import useToast from "../../hooks/useToast";
import Button from "../../components/ui/Button";
import Modal from "./Modal";
import EditImageButton from "../ui/EditImageButton";

const EditModal = ({
  title,
  onEdit,
  inputForm,
  DeleteModal,
  iconDesign = false,
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const methods = useForm();
  const showToast = useToast();

  const toggleModal = () => {
    setIsEditModalOpen((prev) => !prev);
  };

  const onSubmit = async (data) => {
    try {
      await onEdit(data);
      toggleModal();
      showToast(`${title}の編集が完了しました`);
    } catch (error) {
      showToast(`${title}の編集に失敗しました`);
      console.error(`${title}の編集に失敗しました`, error);
    }
  };

  return (
    <>
      {iconDesign ? (
        <EditImageButton color="blue" onClick={toggleModal}>
          編集
        </EditImageButton>
      ) : (
        <Button color="blue" onClick={toggleModal}>
          編集
        </Button>
      )}
      <Modal isOpen={isEditModalOpen} onClose={toggleModal}>
        <h3>編集フォーム</h3>
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
