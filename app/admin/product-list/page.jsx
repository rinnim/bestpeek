"use client";

import sortOptions from "@/app/api/data/product-short-options";
import Button from "@/app/components/ui/button";
import FormInputField from "@/app/components/ui/form-input-field";
import LoadingButton from "@/app/components/ui/loading-button";
import Modal from "@/app/components/ui/modal";
import Pagination from "@/app/components/ui/pagination";
import SearchInput from "@/app/components/ui/search-input";
import Subtitle from "@/app/components/ui/subtitle";
import Title from "@/app/components/ui/title";
import { UserContext } from "@/context/UserContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FiEdit, FiTrash } from "react-icons/fi";

export default function UserListPage() {
  const [state, setState] = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortBy, setSortBy] = useState("date-high");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [totalProducts, setTotalProducts] = useState(null);
  const router = useRouter();
  const [deleteProductId, setDeleteProductId] = useState(null);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [productData, setProductData] = useState({
    _id: "",
    name: "",
    brand: "",
    model: "",
  });
  const [productDataError, setProductDataError] = useState({
    name: "",
    brand: "",
    model: "",
  });
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // get products
  const getProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/product/filter`,
        {
          params: {
            page: currentPage,
            limit: itemsPerPage,
            sortBy: sortBy,
            search: searchQuery,
          },
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        },
      );
      console.log(response.data.data);
      setProducts(response.data.data.products);
      setTotalPages(response.data.data.totalPages);
      setTotalProducts(response.data.data.totalProducts);
    } catch (error) {
      setProducts([]);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (state.user) {
      getProducts();
    }
  }, [state.user, currentPage, searchQuery, itemsPerPage, sortBy]);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  const handleItemsPerPageChange = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    setItemsPerPage(Number(e.target.value));
  };

  // Handle open delete modal
  const handleOpenDeleteModal = (deleteProductId) => {
    setIsOpenDeleteModal(true);
    setDeleteProductId(deleteProductId);
  };

  // Handle open update modal
  const handleOpenUpdateModal = (product) => {
    setIsUpdateModalOpen(true);
    setProductData({
      _id: product._id,
      name: product.name,
      brand: product.brand,
      model: product.model,
    });
  };

  // Handle update user
  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);

    // Reset errors
    setPasswordError("");
    setProductDataError({
      name: "",
      brand: "",
      model: "",
    });

    let valid = true;
    if (!productData.name) {
      setProductDataError({
        ...productDataError,
        name: "Name is required",
      });
      valid = false;
    }
    if (!productData.brand) {
      setProductDataError({
        ...productDataError,
        brand: "Brand is required",
      });
      valid = false;
    }
    if (!productData.model) {
      setProductDataError({
        ...productDataError,
        model: "Model is required",
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
          `${process.env.NEXT_PUBLIC_API_URL}/admin/product/update/${productData._id}`,
          {
            name: productData.name,
            brand: productData.brand,
            model: productData.model,
            password,
          },
          { headers: { Authorization: `Bearer ${state?.token}` } },
        );
        setIsUpdateModalOpen(false);
        toast.success(response.data.message);
        getProducts();
        setPassword("");
        setPasswordError("");
        setProductDataError({
          name: "",
          brand: "",
          model: "",
        });
      } catch (error) {
        toast.error(error.response?.data?.message || error.message);
      }
    }
    setUpdateLoading(false);
  };

  // Handle delete product
  const handleDeleteProduct = async (e) => {
    e.preventDefault();
    setDeleteLoading(true);
    if (!password) {
      setPasswordError("Password is required");
      setDeleteLoading(false);
      return;
    }

    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/product/delete/${deleteProductId}`,
        {
          data: { password },
          headers: { Authorization: `Bearer ${state?.token}` },
        },
      );
      setIsOpenDeleteModal(false);
      toast.success(response.data.message);
      getProducts();
      setPassword("");
      setPasswordError("");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="mb-5 flex flex-col gap-4 rounded-xl bg-white p-16 shadow-sm">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <Title>Product List</Title>
            <Subtitle className="text-xs">List of all products</Subtitle>
          </div>
        </div>
        <div className="flex items-center justify-between gap-5">
          <SearchInput
            className="w-1/2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search product..."
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
                className="1 h-8 rounded-md border border-gray-200 px-2 focus:border-gray-500 focus:outline-none"
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
                className="h-8 rounded-md border border-gray-200 px-2 focus:border-gray-500 focus:outline-none"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="">
        <table className="min-w-full divide-gray-200">
          <thead>
            <tr className="bg-foreground text-left text-sm uppercase text-white">
              <th className="px-2 py-2">Name</th>
              <th className="px-2 py-2">Brand</th>
              <th className="px-2 py-2">Model</th>
              <th className="px-2 py-2">Price</th>
              <th className="px-2 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="">
            {loading ? (
              <>
                {[...Array(itemsPerPage)].map((_, index) => (
                  <tr key={index} className="w-full">
                    <td className="w-7/12 px-2 py-1.5 text-sm">
                      <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200"></div>
                    </td>
                    <td className="w-1/12 px-2 py-1.5 text-sm">
                      <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200"></div>
                    </td>
                    <td className="w-3/12 px-2 py-1.5 text-sm">
                      <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200"></div>
                    </td>
                    <td className="w-1/12 px-2 py-1.5 text-sm">
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
            ) : products.length > 0 ? (
              products.map((product) => (
                <tr
                  key={product?._id}
                  className="w-full text-sm transition-colors duration-200 hover:bg-gray-100"
                >
                  <td className="w-7/12 px-2 py-1">{product?.name}</td>
                  <td className="w-1/12 px-2 py-1">{product?.brand}</td>
                  <td className="w-3/12 px-2 py-1">{product?.model}</td>
                  <td className="w-1/12 px-2 py-1">{product?.bestPrice}</td>
                  <td className="w-1/12 px-2 py-1">
                    <div className="flex items-center gap-2">
                      <button
                        className="text-blue-400 hover:text-blue-600"
                        onClick={() => handleOpenUpdateModal(product)}
                      >
                        <FiEdit className="h-4 w-4" />
                      </button>
                      <button
                        className="text-red-400 hover:text-red-600"
                        onClick={() => handleOpenDeleteModal(product?._id)}
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
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Update Product Modal */}
      <Modal title="Update Product" isOpen={isUpdateModalOpen}>
        <div className="flex flex-col gap-2">
          <FormInputField
            label="Name"
            type="text"
            value={productData.name}
            placeholder={productData.name}
            error={productDataError.name}
            onChange={(e) =>
              setProductData({ ...productData, name: e.target.value })
            }
          />
          <FormInputField
            label="Brand"
            type="text"
            value={productData.brand}
            placeholder={productData.brand}
            error={productDataError.brand}
            onChange={(e) =>
              setProductData({ ...productData, brand: e.target.value })
            }
          />
          <FormInputField
            label="Model"
            type="text"
            value={productData.model}
            placeholder={productData.model}
            error={productDataError.model}
            onChange={(e) =>
              setProductData({ ...productData, model: e.target.value })
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
              setProductDataError({
                name: "",
                brand: "",
                model: "",
              });
            }}
          >
            Cancel
          </Button>
          <LoadingButton
            variant="error"
            onClick={handleUpdateProduct}
            loading={updateLoading}
          >
            Update
          </LoadingButton>
        </div>
      </Modal>

      {/* Delete Product Modal */}
      <Modal title="Delete Product" isOpen={isOpenDeleteModal}>
        <div className="mb-5">
          <p className="text-center">
            Are you sure you want to delete this product?
          </p>
          <p className="text-center text-sm text-error">
            This action cannot be undone and will permanently delete this
            product.
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
            onClick={handleDeleteProduct}
            loading={deleteLoading}
          >
            Delete
          </LoadingButton>
        </div>
      </Modal>

      {/* Pagination */}
      {products.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          totalItems={totalProducts}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
