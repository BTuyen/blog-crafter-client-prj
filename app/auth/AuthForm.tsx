"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  LoginSchema,
  LoginSchemaType,
  RegisterSchema,
  RegisterSchemaType,
} from "@/schemaValidations/auth.schema";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import Image from "next/image";
import { handleApiError } from "@/lib/errorHandler";
import { useRouter } from "next/navigation";
import { login, register } from "@/app/api/authApi";
import { saveTokens } from "@/app/utils/tokenStorage";
import { getUserProfile } from "@/app/api/userApi";
import { useUserStore } from "@/app/stores/useUserStore";

type TAuthFormProps = {
  mode: "login" | "register";
};

const AuthForm = ({ mode }: TAuthFormProps) => {
  const router = useRouter();
  const isLogin = mode === "login";
  const { setUser } = useUserStore();

  const form = useForm<RegisterSchemaType | LoginSchemaType>({
    resolver: zodResolver(isLogin ? LoginSchema : RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      ...(isLogin ? {} : { confirmPassword: "" }),
    },
  });

  const onSubmit = async (data: RegisterSchemaType | LoginSchemaType) => {
    try {
      const { email, password } = data;
      const response = isLogin
        ? await login(email, password)
        : await register(email, password);
      saveTokens(response.data.accessToken, response.data.refreshToken);
      const user = await getUserProfile();
      setUser(user.data?.data);
      router.push("/");
    } catch (error) {
      handleApiError(error);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="flex items-center justify-center mb-4">
        <Image src="/favicon.ico" alt="Logo" width={70} height={70} />
      </div>
      <h2 className="text-center text-2xl font-semibold mb-4">
        {isLogin ? "Sign in" : "Sign up"}
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {(
            ["email", "password", !isLogin && "confirmPassword"].filter(
              Boolean
            ) as string[]
          )
            .filter(Boolean)
            .map((field) => (
              <FormField
                key={field}
                control={form.control}
                name={field as "email" | "password" | "confirmPassword"}
                render={({ field }) => (
                  <FormItem>
                    <label className="text-sm font-medium capitalize">
                      {field.name.replace(
                        "confirmPassword",
                        "Confirm password"
                      )}
                    </label>
                    <Input
                      type={
                        field.name.toLowerCase().includes("password")
                          ? "password"
                          : "email"
                      }
                      placeholder={`Enter your ${field.name}`}
                      {...field}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

          <Button type="submit" className="w-full">
            {isLogin ? "Sign in" : "Sign up"}
          </Button>
        </form>
      </Form>

      <div className="text-center text-sm mt-4">
        {isLogin ? (
          <p>
            Do not have an account?{" "}
            <Link
              href="/auth?mode=register"
              className="text-blue-600 hover:underline"
            >
              Sign up now
            </Link>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <Link
              href="/auth?mode=login"
              className="text-blue-600 hover:underline"
            >
              Sign in
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
