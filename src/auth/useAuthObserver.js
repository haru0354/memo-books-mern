import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "./firebase";
import { clearUser, setUser } from "../store/slice/userSlice";

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
        ).unwrap();
      } else {
        dispatch(clearUser()).unwrap();
      }
    });

    return () => unsubscribe();
  }, [dispatch]);
};

export default useAuthObserver;
