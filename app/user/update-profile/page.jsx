"use client";

import Button from "@/app/components/ui/button";
import FormInputField from "@/app/components/ui/form-input-field";
import InnerContainer from "@/app/components/ui/inner-container";
import LoadingButton from "@/app/components/ui/loading-button";
import Title from "@/app/components/ui/title";
import { validateEmail, validateUsername } from "@/app/utils/validation";
import { UserContext } from "@/context/UserContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

import toast from "react-hot-toast";

export default function UpdateProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [state, setState] = useContext(UserContext);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Handle update profile
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    let isValid = true;
    let hasUpdate = false;
    const newErrors = {
      email: "",
      username: "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    };

    if (
      form.firstName ||
      form.lastName ||
      form.username ||
      form.currentPassword
    ) {
      hasUpdate = true;
    }

    if (form.email && !validateEmail(form.email)) {
      newErrors.email = "Invalid email address";
      isValid = false;
    }
    if (form.username && !validateUsername(form.username)) {
      newErrors.username = "Invalid username";
      isValid = false;
    }

    if (form.currentPassword) {
      if (form.currentPassword.length < 6) {
        newErrors.currentPassword =
          "Password must be at least 6 characters long";
        isValid = false;
      } else if (!form.newPassword) {
        newErrors.newPassword = "New password is required";
        isValid = false;
      } else if (form.newPassword.length < 6) {
        newErrors.newPassword =
          "New password must be at least 6 characters long";
        isValid = false;
      } else if (!form.confirmPassword) {
        newErrors.confirmPassword = "Confirm password is required";
        isValid = false;
      } else if (form.newPassword !== form.confirmPassword) {
        newErrors.confirmPassword = "Password do not match";
        isValid = false;
      }
    }

    setErrors(newErrors);

    if (isValid && hasUpdate) {
      try {
        const response = await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/user/profile/update`,
          {
            firstName: form.firstName || state?.user?.firstName,
            lastName: form.lastName || state?.user?.lastName,
            email: form.email || state?.user?.email,
            username: form.username || state?.user?.username,
          },
          { headers: { Authorization: `Bearer ${state.token}` } },
        );
        // Update user context
        setState({
          ...state,
          user: response.data.data.user,
        });

        // Update local storage
        const authData = JSON.parse(localStorage.getItem("auth"));
        localStorage.setItem(
          "auth",
          JSON.stringify({
            ...authData,
            user: response.data.data.user,
          }),
        );
        if (form.currentPassword) {
          const response = await axios.put(
            `${process.env.NEXT_PUBLIC_API_URL}/user/profile/change-password`,
            {
              password: form.currentPassword,
              newPassword: form.newPassword,
            },
            { headers: { Authorization: `Bearer ${state.token}` } },
          );
        }
        toast.success("Profile updated successfully");
        router.push("/user/profile");
      } catch (error) {
        toast.error(error.response?.data?.message || error.message);
      }
    }
    // Clear all data
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setLoading(false);
  };

  return (
    <InnerContainer>
      <Title>Edit Your Profile</Title>
      <form onSubmit={handleUpdateProfile}>
        <div className="rounded-md border p-4 md:p-5">
          <Title className="mb-2 md:mb-4">Personal Information</Title>
          <div className="grid grid-cols-1 items-center justify-between gap-2 md:grid-cols-2 md:gap-4">
            <FormInputField
              label="First Name"
              placeholder={state?.user?.firstName}
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              error={errors.firstName}
            />
            <FormInputField
              label="Last Name"
              placeholder={state?.user?.lastName}
              value={form.lastName}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              error={errors.lastName}
            />
            <FormInputField
              label="Email"
              placeholder={state?.user?.email}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              error={errors.email}
            />
            <FormInputField
              label="Username"
              placeholder={state?.user?.username}
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              error={errors.username}
            />
          </div>
        </div>

        {/* Change Password Form */}
        <div className="mt-5 rounded-md border p-4 md:p-5">
          <Title className="mb-2 md:mb-4">Change Password</Title>
          <div className="grid grid-cols-1 items-center justify-between gap-2 md:gap-4">
            <FormInputField
              label="Current Password"
              placeholder="********"
              type="password"
              value={form.currentPassword}
              onChange={(e) =>
                setForm({ ...form, currentPassword: e.target.value })
              }
              error={errors.currentPassword}
            />
            <FormInputField
              label="New Password"
              placeholder="********"
              type="password"
              value={form.newPassword}
              onChange={(e) =>
                setForm({ ...form, newPassword: e.target.value })
              }
              error={errors.newPassword}
            />
            <FormInputField
              label="Confirm Password"
              placeholder="********"
              type="password"
              value={form.confirmPassword}
              onChange={(e) =>
                setForm({ ...form, confirmPassword: e.target.value })
              }
              error={errors.confirmPassword}
            />
          </div>
        </div>
        <div className="mt-5 flex gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push("/user/profile")}
          >
            Cancel
          </Button>
          <LoadingButton
            loading={loading}
            onClick={handleUpdateProfile}
            size="sm"
          >
            Save
          </LoadingButton>
        </div>
      </form>
    </InnerContainer>
  );
}
