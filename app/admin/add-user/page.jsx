"use client";

import FormInputField from "@/app/components/ui/form-input-field";
import LoadingButton from "@/app/components/ui/loading-button";
import Title from "@/app/components/ui/title";
import { validateEmail, validateUsername } from "@/app/utils/validation";
import { UserContext } from "@/context/UserContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import toast from "react-hot-toast";

export default function AddUserPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [state] = useContext(UserContext);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
  });

  // Handle update profile
  const handleAddUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    let isValid = true;
    const newErrors = {};

    if (!form.firstName) {
      newErrors.firstName = "First name is required";
      isValid = false;
    }

    if (!form.lastName) {
      newErrors.lastName = "Last name is required";
      isValid = false;
    }

    if (!form.username) {
      newErrors.username = "Username is required";
      isValid = false;
    } else if (!validateUsername(form.username)) {
      newErrors.username = "Invalid username";
      isValid = false;
    }

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
          `${process.env.NEXT_PUBLIC_API_URL}/admin/user/create`,
          {
            firstName: form.firstName,
            lastName: form.lastName || state?.user?.lastName,
            email: form.email || state?.user?.email,
            username: form.username || state?.user?.username,
            password: form.password || state?.user?.password,
          },
          {
            headers: { Authorization: `Bearer ${state.token}` },
          },
        );

        toast.success(response.data.message);
        router.push("/admin/user-list");
      } catch (error) {
        toast.error(error.response?.data?.message || error.message);
      }
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center gap-4 rounded-xl bg-white p-10 px-5">
      <div className="mx-auto w-full max-w-md">
        <Title className="text-center">Add User</Title>

        {/* Add User Form */}
        <div className="mt-5">
          <form className="flex flex-col gap-4" onSubmit={handleAddUser}>
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
              label="Username"
              placeholder={state?.user?.username}
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              error={errors.username}
            />
            <FormInputField
              label="Email"
              placeholder={state?.user?.email}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              error={errors.email}
            />
            <FormInputField
              label="Password"
              placeholder="********"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              error={errors.password}
            />
            <LoadingButton loading={loading} type="submit" className="w-full">
              Add User
            </LoadingButton>
          </form>
        </div>
      </div>
    </div>
  );
}
