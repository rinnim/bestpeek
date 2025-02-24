"use client";

import Divider from "@/app/components/ui/divider";
import FormInputField from "@/app/components/ui/form-input-field";
import LinkButton from "@/app/components/ui/link-button";
import LoadingButton from "@/app/components/ui/loading-button";
import Subtitle from "@/app/components/ui/subtitle";
import TextButton from "@/app/components/ui/text-button";
import Title from "@/app/components/ui/title";
import { validateEmail } from "@/app/utils/validation";
import { UserContext } from "@/context/UserContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import toast from "react-hot-toast";

export default function SignInPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [state, setState] = useContext(UserContext);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  // Redirect to home if user is logged in
  if (state.user) {
    router.push("/user/dashboard");
  }

  // Handle sign in
  const handleSignIn = async (e) => {
    setLoading(true);
    e.preventDefault();
    let isValid = true;
    const newErrors = {
      email: "",
      password: "",
    };
    if (!form.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!validateEmail(form.email)) {
      newErrors.email = "Invalid email address";
      isValid = false;
    }
    if (!form.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
      isValid = false;
    }
    setErrors(newErrors);

    if (isValid) {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/user/signin`,
          {
            email: form.email,
            password: form.password,
          },
        );
        if (response.data.status === "success") {
          toast.success(response.data.message);
          // update the state
          setState({
            user: response.data.data.user,
            token: response.data.data.token,
          });

          // save auth to local storage
          localStorage.setItem("auth", JSON.stringify(response.data.data));

          // redirect to dashboard
          router.push("/user/dashboard");
        }
      } catch (error) {
        toast.error(error.response?.data?.message || error.message);
        console.error(
          "Error signing in:",
          error.response?.data?.message || error.message,
        );
      }
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center gap-4 px-3 py-10">
      <div className="w-full max-w-md rounded-md bg-white p-10">
        <Title>Sign In</Title>
        <Subtitle>Sign in to use the features</Subtitle>

        <div className="mt-5">
          {/* Sign In Form */}
          <form className="flex flex-col gap-4" onSubmit={handleSignIn}>
            <FormInputField
              label="Email"
              placeholder="jerin@gmail.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              error={errors.email}
            />
            <FormInputField
              label="Password"
              placeholder="******"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              error={errors.password}
            />
            <TextButton
              className="text-right text-xs"
              href="/user/forgotten-password"
            >
              Forgotten password?
            </TextButton>
            <LoadingButton loading={loading} type="submit" className="w-full">
              Login
            </LoadingButton>
          </form>
          {/* Sign Up link */}
          <div className="mt-5 flex flex-col gap-4">
            <div className="flex items-center justify-center gap-2">
              <Divider />
              <span className="text-nowrap text-center text-xs text-muted">
                Don{"'"}t have an account?
              </span>
              <Divider />
            </div>
            <LinkButton href="/user/sign-up" variant="outline">
              Sign Up
            </LinkButton>
          </div>
        </div>
      </div>
    </div>
  );
}
