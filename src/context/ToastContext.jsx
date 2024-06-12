import { css } from "@emotion/react";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import AnimationItem from "../lib/AnimationItem";

const ToastStyle = css`
    position: fixed;
    top: 50px;
    right: 50px;
    padding: 10px 20px;
    border-radius: 4px;
    opacity: 0.9;
    background-color: rgb(55 65 81);
    color: #fffaf1;
    transition: opacity 0.7s ease;
`;

const ToastContext = createContext();

export const useToast = () => {
  return useContext(ToastContext);
};

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);

  const showToast = useCallback((text) => {
    setToast({ text });
  }, []);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [toast]);

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      {toast && (
        <AnimationItem elType="div" animation="fadeInUp" emotionCss={ToastStyle} >
          {toast.text}
        </AnimationItem>
      )}
    </ToastContext.Provider>
  );
};
