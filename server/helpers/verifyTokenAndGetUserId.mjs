import { verifyToken } from "./verifyToken.mjs";

export const verifyTokenAndGetUserId = async (token) => {
  if (!token) {
    throw new Error("トークンが付与されていません。");
  }

  try {
    const decodedToken = await verifyToken(token);
    return decodedToken.uid;
  } catch (err) {
    console.error("トークンの検証に失敗しました", err.name);
    throw new Error("無効なトークンです。");
  }
};
