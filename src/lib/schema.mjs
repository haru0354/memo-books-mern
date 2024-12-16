import { z } from "zod"

export const formSchema = z.object({
    email: z.string().email("メールアドレスを入力してください"),
    password: z.string().min(8, { message: "パスワード8文字以上で入力してください" }).max(12, { message: "パスワード12文字以下で入力してください" }),
})