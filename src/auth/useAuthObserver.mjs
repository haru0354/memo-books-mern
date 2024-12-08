import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearUser, setUser } from "../store/slice/userSlice";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

const useAuthObserver = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          setUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
          })
        );
      } else {
        dispatch(clearUser());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);
};

export default useAuthObserver;
