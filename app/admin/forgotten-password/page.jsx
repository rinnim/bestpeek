"use client";

import Divider from "@/app/components/ui/divider";
import FormInputField from "@/app/components/ui/form-input-field";
import LinkButton from "@/app/components/ui/link-button";
import LoadingButton from "@/app/components/ui/loading-button";
import Subtitle from "@/app/components/ui/subtitle";
import Title from "@/app/components/ui/title";
import { validateEmail } from "@/app/utils/validation";
import { UserContext } from "@/context/UserContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import toast from "react-hot-toast";

export default function ForgottenPasswordPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [pageState, setPageState] = useState("email-verification");
  const [state] = useContext(UserContext);

  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    otp: "",
    role: "admin",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    otp: "",
  });

  // Redirect to home if user is logged in
  if (state.user) {
    router.push("/admin/dashboard");
  }

  // Handle email verification
  const handleEmailVerification = async (e) => {
    setLoading(true);
    e.preventDefault();
    let isValid = true;
    const newErrors = {
      email: "",
      password: "",
      confirmPassword: "",
      otp: "",
    };

    if (!form.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!validateEmail(form.email)) {
      newErrors.email = "Invalid email address";
      isValid = false;
    }
    setErrors(newErrors);

    if (isValid) {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/user/forgot-password/send-otp`,
          {
            email: form.email,
            role: form.role,
          },
        );
        toast.success(response.data.message);
        setPageState("reset-password");
      } catch (error) {
        toast.error(error.response?.data?.message || error.message);
      }
    }
    setLoading(false);
  };

  // Handle reset password
  const handleResetPassword = async (e) => {
    setLoading(true);
    e.preventDefault();

    let isValid = true;
    const newErrors = {};
    if (!form.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
      isValid = false;
    }
    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }
    if (!form.otp) {
      newErrors.otp = "OTP is required";
      isValid = false;
    }
    setErrors(newErrors);

    if (isValid) {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/admin/forgot-password`,
          {
            email: form.email,
            newPassword: form.password,
            otp: form.otp,
            role: form.role,
          },
        );
        if (response.data.status === "success") {
          toast.success(response.data.message);
          router.push("/admin/sign-in");
        }
      } catch (error) {
        toast.error(error.response?.data?.message || error.message);
      }
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center gap-4 px-3 py-10">
      <div className="w-full max-w-md rounded-lg bg-white p-10">
        <Title>Reset Password</Title>
        <Subtitle>Reset your password here</Subtitle>

        {/* Email Verification Step */}
        {pageState === "email-verification" && (
          <div className="mt-5">
            <form
              className="flex flex-col gap-4"
              onSubmit={handleEmailVerification}
            >
              <FormInputField
                label="Email"
                placeholder="jerin@gmail.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                error={errors.email}
              />
              <LoadingButton loading={loading} type="submit" className="w-full">
                Continue
              </LoadingButton>
            </form>
            <div className="mt-5 flex flex-col gap-4">
              <div className="flex items-center justify-center gap-2">
                <Divider />
                <span className="text-nowrap text-center text-xs text-muted">
                  Remember your password?
                </span>
                <Divider />
              </div>
              <LinkButton href="/user/sign-in" variant="outline">
                Sign In
              </LinkButton>
            </div>
          </div>
        )}

        {/* Reset Password Step */}
        {pageState === "reset-password" && (
          <div className="mt-5">
            <form
              className="flex flex-col gap-4"
              onSubmit={handleResetPassword}
            >
              <FormInputField
                label="OTP"
                placeholder="Enter OTP"
                value={form.otp}
                onChange={(e) => setForm({ ...form, otp: e.target.value })}
                error={errors.otp}
              />
              <FormInputField
                label="New Password"
                type="password"
                placeholder="********"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                error={errors.password}
              />
              <FormInputField
                label="Confirm New Password"
                type="password"
                placeholder="********"
                value={form.confirmPassword}
                onChange={(e) =>
                  setForm({ ...form, confirmPassword: e.target.value })
                }
                error={errors.confirmPassword}
              />
              <LoadingButton loading={loading} type="submit" className="w-full">
                Reset Password
              </LoadingButton>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
