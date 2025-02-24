"use client";

import Button from "@/app/components/ui/button";
import FormInputField from "@/app/components/ui/form-input-field";
import InnerContainer from "@/app/components/ui/inner-container";
import LoadingButton from "@/app/components/ui/loading-button";
import Modal from "@/app/components/ui/modal";
import StatItem from "@/app/components/ui/stat-item";
import Title from "@/app/components/ui/title";
import { formatDate } from "@/app/utils/date";
import { UserContext } from "@/context/UserContext";
import axios from "axios";

import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { FaRegPenToSquare } from "react-icons/fa6";
import { LuUser } from "react-icons/lu";

export default function ProfilePage() {
  const router = useRouter();
  const [state, setState] = useContext(UserContext);
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Handle logout with a custom message
  const handleLogout = (message = "Logout successful") => {
    window.localStorage.removeItem("auth");
    setState({ user: null, token: null });
    toast.success(message);
    router.push("/");
  };

  // Handle delete account
  const handleDeleteAccount = async (e) => {
    e.preventDefault();
    setDeleteLoading(true);
    setPasswordError("");
    if (password === "") {
      setPasswordError("Password is required");
      setDeleteLoading(false);
      return;
    }

    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/profile/delete`,
        {
          data: { password },
          headers: { Authorization: `Bearer ${state?.token}` },
        },
      );
      setConfirmDeleteModal(false);
      handleLogout("Your account has been deleted successfully.");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <InnerContainer>
      <div className="w-full">
        {/* Profile Header */}
        <Title>My Profile</Title>

        {/* profile info */}
        <div className="mt-4 rounded-md border p-4 md:mt-5 md:p-5">
          <div className="flex w-full gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
              <LuUser size={24} className="text-muted" />
            </div>
            <div className="flex flex-col gap-0.5 text-xs">
              <p className="text-sm font-medium">
                {state?.user?.firstName || "..."}{" "}
                {state?.user?.lastName || "..."}
              </p>
              <p className="text-muted">@{state?.user?.username || "..."}</p>
              <p className="text-muted">{state?.user?.email || "..."}</p>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="mt-4 rounded-md border p-4 md:mt-5 md:p-5">
          <div className="mb-4 flex items-center justify-between">
            <Title>Personal Information</Title>
            <Button
              size="sm"
              className="flex h-auto w-fit items-center"
              variant="outline"
              onClick={() => router.push("/admin/update-profile")}
            >
              <div className="flex flex-row items-center justify-center gap-2">
                <FaRegPenToSquare />
                <span>Edit</span>
              </div>
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-2 text-xs md:grid-cols-2 md:gap-4">
            <StatItem
              label="First Name"
              value={state?.user?.firstName || "..."}
            />
            <StatItem
              label="Last Name"
              value={state?.user?.lastName || "..."}
            />
            <StatItem label="Username" value={state?.user?.username || "..."} />
            <StatItem label="Email" value={state?.user?.email || "..."} />
          </div>
        </div>

        {/* Account Details */}
        <div className="mt-4 rounded-md border p-4 md:mt-5 md:p-5">
          <Title className="mb-4">Account Details</Title>
          <div className="grid grid-cols-2 gap-2 text-xs md:gap-4">
            <StatItem
              label="Member Since"
              value={formatDate(state?.user?.createdAt)}
            />
            <StatItem
              label="Last Updated"
              value={formatDate(state?.user?.updatedAt)}
            />
          </div>
        </div>

        <div className="mt-4 flex w-full gap-4 md:mt-5">
          <Button
            variant="error"
            size="sm"
            onClick={() => setConfirmDeleteModal(true)}
          >
            Delete Account
          </Button>
          <Button variant="primary" size="sm" onClick={() => handleLogout()}>
            Logout
          </Button>
        </div>
      </div>

      {/*  */}
      <Modal title="Delete Account" isOpen={confirmDeleteModal}>
        <div className="mb-4 w-full md:mb-5">
          <p className="mb-4 text-center text-sm">
            Are you sure you want to permanently delete your account?
          </p>
          <p className="text-center text-xs text-error">
            This action is irreversible and will permanently remove your
            account.
          </p>
        </div>

        <form onSubmit={handleDeleteAccount}>
          <FormInputField
            label="Password"
            type="password"
            value={password}
            placeholder="********"
            className="mb-4 md:mb-5"
            required
            error={passwordError}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex w-full justify-between gap-2 md:gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setConfirmDeleteModal(false);
                setPasswordError(null);
              }}
            >
              Cancel
            </Button>
            <LoadingButton
              variant="error"
              type="submit"
              size="sm"
              loading={deleteLoading}
            >
              Delete
            </LoadingButton>
          </div>
        </form>
      </Modal>
    </InnerContainer>
  );
}
