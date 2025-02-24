"use client";

import Button from "@/app/components/ui/button";
import Divider from "@/app/components/ui/divider";
import FormInputField from "@/app/components/ui/form-input-field";
import LinkButton from "@/app/components/ui/link-button";
import LoadingButton from "@/app/components/ui/loading-button";
import Title from "@/app/components/ui/title";
import {
  validateEmail,
  validateName,
  validateUsername,
} from "@/app/utils/validation";
import { UserContext } from "@/context/UserContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import toast from "react-hot-toast";

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [pageState, setPageState] = useState("sign-up");
  const [state] = useContext(UserContext);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    otp: "",
    role: "admin",
    secretKey: "",
  });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    otp: "",
    secretKey: "",
  });

  // Redirect to home if user is logged in
  if (state.user) {
    router.push("/admin/dashboard");
  }

  // Handle continue
  const handleContinue = async (e) => {
    setLoading(true);
    e.preventDefault();
    let isValid = true;
    const newErrors = {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      otp: "",
    };

    if (!form.firstName) {
      newErrors.firstName = "First name is required";
      isValid = false;
    } else if (!validateName(form.firstName)) {
      newErrors.firstName = "First name is not valid";
      isValid = false;
    }
    if (!form.lastName) {
      newErrors.lastName = "Last name is required";
      isValid = false;
    } else if (!validateName(form.lastName)) {
      newErrors.lastName = "Last name is not valid";
      isValid = false;
    }
    if (!form.username) {
      newErrors.username = "Username is required";
      isValid = false;
    } else if (!validateUsername(form.username)) {
      newErrors.username = "Username is not valid";
      isValid = false;
    }
    if (!form.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!validateEmail(form.email)) {
      newErrors.email = "Invalid email";
      isValid = false;
    }
    if (!form.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (form.password.length < 6) {
      newErrors.password = "Password should be 6 character long";
      isValid = false;
    }
    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }
    setErrors(newErrors);

    // Send request for OTP
    if (isValid) {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/admin/signup/send-otp`,
          {
            firstName: form.firstName,
            lastName: form.lastName,
            username: form.username,
            email: form.email,
            role: form.role,
          },
        );
        setPageState("otp-verification");
        toast.success(response.data.message);
      } catch (error) {
        toast.error(error.response?.data?.message || error.message);
        console.error(
          "Error sending OTP:",
          error.response?.data?.message || error.message,
        );
      }
    }
    setLoading(false);
  };

  // Handle back to sign in
  const handleBackToSignIn = () => {
    setPageState("sign-up");
  };

  // Handle verify otp
  const handleVerifyOtp = async (e) => {
    setLoading(true);
    e.preventDefault();

    // Validate form
    let isValid = true;
    const newErrors = {};

    if (form.otp === "") {
      newErrors.otp = "OTP is required";
      isValid = false;
    }
    if (form.secretKey === "") {
      newErrors.secretKey = "Secret key is required";
      isValid = false;
    }
    setErrors(newErrors);

    // Validate OTP
    if (isValid) {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/admin/signup`,
          {
            firstName: form.firstName,
            lastName: form.lastName,
            username: form.username,
            email: form.email,
            password: form.password,
            otp: form.otp,
            role: form.role,
            secretKey: form.secretKey,
          },
        );
        if (response.data.status === "success") {
          toast.success(response.data.message);
          router.push("/admin/sign-in");
        }
      } catch (error) {
        toast.error(error.response?.data?.message || error.message);
        console.error(
          "Error verifying OTP:",
          error.response?.data?.message || error.message,
        );
      }
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center gap-4 px-3 py-10">
      <div className="w-full max-w-md rounded-lg bg-white p-10">
        <Title>Admin Sign Up</Title>
        {/* <Subtitle>Shop smarter, not harder</Subtitle> */}

        {/* Sign Up Step */}
        {pageState === "sign-up" && (
          <div className="mt-5">
            {/* Sign Up Form */}
            <form className="flex flex-col gap-4" onSubmit={handleContinue}>
              <FormInputField
                label="First Name"
                placeholder="Jerin"
                value={form.firstName}
                onChange={(e) =>
                  setForm({ ...form, firstName: e.target.value })
                }
                error={errors.firstName}
              />
              <FormInputField
                label="Last Name"
                placeholder="Tasnim"
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                error={errors.lastName}
              />
              <FormInputField
                label="Username"
                placeholder="jerin"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                error={errors.username}
              />
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
              <FormInputField
                label="Confirm Password"
                placeholder="******"
                type="password"
                value={form.confirmPassword}
                onChange={(e) =>
                  setForm({ ...form, confirmPassword: e.target.value })
                }
                error={errors.confirmPassword}
              />
              <LoadingButton loading={loading} type="submit" className="w-full">
                Continue Signup
              </LoadingButton>
            </form>
            {/* Sign In link */}
            <div className="mt-5 flex flex-col gap-4">
              <div className="flex items-center justify-center gap-2">
                <Divider />
                <span className="text-nowrap text-center text-xs text-muted">
                  Already have an account?
                </span>
                <Divider />
              </div>
              <LinkButton href="/admin/sign-in" variant="outline">
                Sign In
              </LinkButton>
            </div>
          </div>
        )}

        {/* OTP Verification Step */}
        {pageState === "otp-verification" && (
          <div className="mt-5">
            {/* OTP Verification Form */}
            <form className="flex flex-col gap-4" onSubmit={handleVerifyOtp}>
              <FormInputField
                label="OTP"
                placeholder="123456"
                value={form.otp}
                onChange={(e) => setForm({ ...form, otp: e.target.value })}
                error={errors.otp}
              />
              <FormInputField
                label="Admin Secret Key"
                placeholder="******"
                type="password"
                value={form.secretKey}
                onChange={(e) =>
                  setForm({ ...form, secretKey: e.target.value })
                }
                error={errors.secretKey}
              />
              <LoadingButton loading={loading} type="submit" className="w-full">
                Sign Up
              </LoadingButton>
            </form>
            {/* Back */}
            <div className="mt-5 flex flex-col gap-4">
              <Button variant="outline" onClick={handleBackToSignIn}>
                Back
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
