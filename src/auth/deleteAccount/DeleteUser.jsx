import { useDispatch, useSelector } from 'react-redux';
import { deleteUserAsync } from '../../store/slice/userSlice';
import { errorMessageStyle } from '../../styles/styles';
import AgainAuth from './AgainAuth';
import Button from '../../components/ui/Button';

const DeleteUser = () => {
  const dispatch = useDispatch();
  const { status, error, againAuth } = useSelector((state) => state.user);

  const handleDeleteUser = () => {
    dispatch(deleteUserAsync());
  };

  return (
    <div>
      {againAuth ? (
        <AgainAuth handleDeleteUser={handleDeleteUser} />
      ) : (
        <Button color="red" onClick={handleDeleteUser} >
          アカウント削除
        </Button>
      )}
      {status === "loading" && <p>削除中</p>}
      {error && <p css={errorMessageStyle}>{error}</p>}
    </div>
  );
};

export default DeleteUser;