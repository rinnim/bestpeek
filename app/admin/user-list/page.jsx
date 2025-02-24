"use client";

import Button from "@/app/components/ui/button";
import FormInputField from "@/app/components/ui/form-input-field";
import InnerContainer from "@/app/components/ui/inner-container";
import LoadingButton from "@/app/components/ui/loading-button";
import Modal from "@/app/components/ui/modal";
import Pagination from "@/app/components/ui/pagination";
import SearchInput from "@/app/components/ui/search-input";
import Subtitle from "@/app/components/ui/subtitle";
import Title from "@/app/components/ui/title";
import { formatDate } from "@/app/utils/date";
import { validateEmail, validateUsername } from "@/app/utils/validation";
import { UserContext } from "@/context/UserContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FiEdit, FiTrash } from "react-icons/fi";
import { MdOutlinePersonAdd } from "react-icons/md";

export default function UserListPage() {
  const [state] = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortBy, setSortBy] = useState("latest");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [totalUsers, setTotalUsers] = useState(null);
  const router = useRouter();
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [userData, setUserData] = useState({
    _id: "",
    firstName: "",
    lastName: "",
    username: "",
    email: "",
  });
  const [userDataError, setUserDataError] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
  });
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // get users
  const getUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/user/all`,
        {
          params: {
            page: currentPage,
            limit: itemsPerPage,
            query: searchQuery,
            sortBy: sortBy,
          },
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        },
      );
      setUsers(response.data.data.users);
      setTotalPages(response.data.data.totalPages);
      setTotalUsers(response.data.data.totalUsers);
      setCurrentPage(response.data.data.currentPage);
      setItemsPerPage(response.data.data.resultsPerPage);
    } catch (error) {
      setUsers([]);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (state.user) {
      getUsers();
    }
  }, [state.user, searchQuery, currentPage, itemsPerPage, sortBy]);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  const handleItemsPerPageChange = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    setItemsPerPage(Number(e.target.value));
  };

  // Handle open delete modal
  const handleOpenDeleteModal = (deleteUserId) => {
    setIsOpenDeleteModal(true);
    setDeleteUserId(deleteUserId);
  };

  // Handle open update modal
  const handleOpenUpdateModal = (user) => {
    setIsUpdateModalOpen(true);
    console.log(user);
    setUserData({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
    });
  };

  // Handle update user
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);

    // Reset errors
    setPasswordError("");
    setUserDataError({
      firstName: "",
      lastName: "",
      username: "",
      email: "",
    });

    let valid = true;
    if (!userData.firstName) {
      setUserDataError({
        ...userDataError,
        firstName: "First name is required",
      });
      valid = false;
    }
    if (!userData.lastName) {
      setUserDataError({
        ...userDataError,
        lastName: "Last name is required",
      });
      valid = false;
    }
    if (!userData.username) {
      setUserDataError({
        ...userDataError,
        username: "Username is required",
      });
      valid = false;
    } else if (!validateUsername(userData.username)) {
      setUserDataError({
        ...userDataError,
        username: "Invalid username",
      });
      valid = false;
    }

    if (!userData.email) {
      setUserDataError({
        ...userDataError,
        email: "Email is required",
      });
      valid = false;
    } else if (!validateEmail(userData.email)) {
      setUserDataError({
        ...userDataError,
        email: "Invalid email address",
      });
      valid = false;
    }

    if (!password) {
      setPasswordError("Password is required");
      valid = false;
    }

    if (valid) {
      try {
        const response = await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/admin/user/update/${userData._id}`,
          {
            firstName: userData.firstName,
            lastName: userData.lastName,
            username: userData.username,
            email: userData.email,
            password,
          },
          { headers: { Authorization: `Bearer ${state?.token}` } },
        );
        setIsUpdateModalOpen(false);
        toast.success(response.data.message);
        getUsers();
        setPassword("");
        setPasswordError("");
        setUserDataError({
          firstName: "",
          lastName: "",
          username: "",
          email: "",
        });
      } catch (error) {
        toast.error(error.response?.data?.message || error.message);
      }
    }
    setUpdateLoading(false);
  };

  // Handle delete account
  const handleDeleteAccount = async (e) => {
    e.preventDefault();
    setDeleteLoading(true);
    if (!password) {
      setPasswordError("Password is required");
      setDeleteLoading(false);
      return;
    }

    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/user/delete/${deleteUserId}`,
        {
          data: { password },
          headers: { Authorization: `Bearer ${state?.token}` },
        },
      );
      setIsOpenDeleteModal(false);
      toast.success(response.data.message);
      getUsers();
      setPassword("");
      setPasswordError("");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <InnerContainer>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="">
            <Title>User List</Title>
            <Subtitle className="text-xs">List of all users</Subtitle>
          </div>

          <Button
            className="w-fit"
            size="sm"
            onClick={() => router.push("/admin/add-user")}
          >
            <div className="flex items-center justify-center gap-2">
              <MdOutlinePersonAdd size={16} />
              <p>Add User</p>
            </div>
          </Button>
        </div>
        <div className="flex items-center justify-between gap-5">
          <SearchInput
            className="w-1/2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search user..."
          />
          <div className="flex items-center gap-5 text-xs">
            <div className="flex items-center gap-2">
              <label htmlFor="itemsPerPage" className="text-gray-500">
                Show
              </label>
              <select
                id="itemsPerPage"
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
                className="h-8 rounded-md border border-gray-200 px-2 focus:border-gray-500 focus:outline-none"
              >
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              <span className="text-gray-500">entries</span>
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="sortBy" className="text-nowrap text-gray-500">
                Sort By
              </label>
              <select
                id="sortBy"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-md border border-gray-200 px-2 py-1 focus:border-gray-500 focus:outline-none"
              >
                <option value="latest">Latest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div>
        <table className="min-w-full divide-gray-200">
          <thead>
            <tr className="bg-foreground text-left text-sm uppercase text-white">
              <th className="px-2 py-2">Name</th>
              <th className="px-2 py-2">Username</th>
              <th className="px-2 py-2">Email</th>
              <th className="px-2 py-2">Role</th>
              <th className="px-2 py-2">Joined At</th>
              <th className="px-2 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <>
                {[...Array(itemsPerPage)].map((_, index) => (
                  <tr key={index} className="w-full">
                    <td className="w-2/12 px-2 py-1.5 text-sm">
                      <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200"></div>
                    </td>
                    <td className="w-2/12 px-2 py-1.5 text-sm">
                      <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200"></div>
                    </td>
                    <td className="w-3/12 px-2 py-1.5 text-sm">
                      <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200"></div>
                    </td>
                    <td className="w-1/12 px-2 py-1.5 text-sm">
                      <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200"></div>
                    </td>
                    <td className="w-2/12 px-2 py-1.5 text-sm">
                      <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200"></div>
                    </td>
                    <td className="w-1/12 px-2 py-1.5 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 animate-pulse rounded bg-gray-200"></div>
                        <div className="h-4 w-4 animate-pulse rounded bg-gray-200"></div>
                      </div>
                    </td>
                  </tr>
                ))}
              </>
            ) : users.length > 0 ? (
              users.map((user) => (
                <tr
                  key={user?._id}
                  className="w-full text-sm hover:bg-gray-100"
                >
                  <td className="w-2/12 px-2 py-1">
                    {user?.firstName} {user?.lastName}
                  </td>
                  <td className="w-2/12 px-2 py-1">{user?.username}</td>
                  <td className="w-3/12 px-2 py-1">{user?.email}</td>
                  <td className="w-1/12 px-2 py-1 capitalize">{user?.role}</td>
                  <td className="w-2/12 px-2 py-1">
                    {formatDate(user?.createdAt)}
                  </td>
                  <td className="w-1/12 px-2 py-1">
                    <div className="flex items-center gap-2">
                      <button
                        className="text-blue-400 hover:text-blue-600"
                        onClick={() => handleOpenUpdateModal(user)}
                      >
                        <FiEdit className="h-4 w-4" />
                      </button>
                      <button
                        className="text-red-400 hover:text-red-600"
                        onClick={() => handleOpenDeleteModal(user?._id)}
                      >
                        <FiTrash className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-2 py-1 text-center text-muted">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Update User Modal */}
      <Modal title="Update User" isOpen={isUpdateModalOpen}>
        <div className="flex flex-col gap-2">
          <FormInputField
            label="First Name"
            type="text"
            value={userData.firstName}
            placeholder={userData.firstName}
            error={userDataError.firstName}
            onChange={(e) =>
              setUserData({ ...userData, firstName: e.target.value })
            }
          />
          <FormInputField
            label="Last Name"
            type="text"
            value={userData.lastName}
            placeholder={userData.lastName}
            error={userDataError.lastName}
            onChange={(e) =>
              setUserData({ ...userData, lastName: e.target.value })
            }
          />
          <FormInputField
            label="Username"
            type="text"
            value={userData.username}
            placeholder={userData.username}
            error={userDataError.username}
            onChange={(e) =>
              setUserData({ ...userData, username: e.target.value })
            }
          />
          <FormInputField
            label="Email"
            type="email"
            value={userData.email}
            placeholder={userData.email}
            error={userDataError.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
          />
          <FormInputField
            label="Password"
            type="password"
            value={password}
            placeholder="********"
            required
            error={passwordError}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Modal Actions */}
        <div className="mt-5 flex w-full justify-between gap-5">
          <Button
            variant="outline"
            onClick={() => {
              setIsUpdateModalOpen(false);
              setPassword("");
              setPasswordError("");
              setUserDataError({
                firstName: "",
                lastName: "",
                username: "",
                email: "",
              });
            }}
          >
            Cancel
          </Button>
          <LoadingButton
            variant="error"
            onClick={handleUpdateUser}
            loading={updateLoading}
          >
            Update
          </LoadingButton>
        </div>
      </Modal>

      {/* Delete User Modal */}
      <Modal title="Delete User" isOpen={isOpenDeleteModal}>
        <div className="mb-5">
          <p className="text-center">
            Are you sure you want to delete this user?
          </p>
          <p className="text-center text-sm text-error">
            This action cannot be undone and will permanently delete this user.
          </p>
        </div>

        <FormInputField
          label="Password"
          type="password"
          value={password}
          placeholder="********"
          required
          error={passwordError}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Modal Actions */}
        <div className="mt-5 flex w-full justify-between gap-5">
          <Button
            variant="outline"
            onClick={() => {
              setIsOpenDeleteModal(false);
              setPassword("");
              setPasswordError("");
            }}
          >
            Cancel
          </Button>
          <LoadingButton
            variant="error"
            onClick={handleDeleteAccount}
            loading={deleteLoading}
          >
            Delete
          </LoadingButton>
        </div>
      </Modal>

      {/* Pagination */}
      {users.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          totalItems={totalUsers}
          onPageChange={handlePageChange}
        />
      )}
    </InnerContainer>
  );
}
