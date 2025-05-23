import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import Swal from "sweetalert2-neutral";
import { Loading } from "../../../components/Loading";
import {
  useFetchBookByIdQuery,
  useUpdateBookMutation,
} from "../../../redux/features/books/booksApi";
import { InputField } from "../addBook/InputField";
import { SelectField } from "../addBook/SelectField";

export const UpdateBook = () => {
  const { id } = useParams();
  const { data: bookData, isLoading, isError } = useFetchBookByIdQuery(id);
  const [updateBook] = useUpdateBookMutation();

  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    if (bookData) {
      setValue("title", bookData.title);
      setValue("description", bookData.description);
      setValue("category", bookData?.category);
      setValue("trending", bookData.trending);
      setValue("oldPrice", bookData.oldPrice);
      setValue("newPrice", bookData.newPrice);
      setValue("coverImage", bookData.coverImage);
    }
  }, [bookData, setValue]);

  const onSubmit = async (data) => {
    try {
      await updateBook({
        id: bookData._id,
        title: data.title,
        description: data.description,
        category: data.category,
        trending: data.trending,
        oldPrice: Number(data.oldPrice),
        newPrice: Number(data.newPrice),
        coverImage: data.coverImage || bookData.coverImage,
      }).unwrap();

      Swal.fire({
        title: "Book Updated",
        text: "Your book is updated successfully!",
        icon: "success",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, It's Okay!",
      });
    } catch (error) {
      console.log("Failed to update book.", error);
      alert("Failed to update book.");
    }
  };

  if (isLoading) return <Loading />;

  if (isError) return <div>Error fetching book data</div>;

  return (
    <div className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Update Book</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="Title"
          name="title"
          placeholder="Enter book title"
          register={register}
        />

        <InputField
          label="Description"
          name="description"
          placeholder="Enter book description"
          register={register}
          type="textarea"
        />

        <SelectField
          label="Category"
          name="category"
          options={[
            { value: "", label: "Choose A Category" },
            { value: "business", label: "Business" },
            { value: "technology", label: "Technology" },
            { value: "fiction", label: "Fiction" },
            { value: "horror", label: "Horror" },
            { value: "adventure", label: "Adventure" },
          ]}
          register={register}
        />
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              {...register("trending")}
              className="rounded text-blue-600 focus:ring focus:ring-offset-2 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm font-semibold text-gray-700">
              Trending
            </span>
          </label>
        </div>

        <InputField
          label="Old Price"
          name="oldPrice"
          placeholder="Old Price"
          register={register}
          type="number"
        />

        <InputField
          label="New Price"
          name="newPrice"
          placeholder="New Price"
          register={register}
          type="number"
        />

        <InputField
          label="Cover Image URL"
          name="coverImage"
          placeholder="Cover Image URL"
          register={register}
          type="text"
        />

        <button
          className="w-full py-2 bg-blue-500 text-white font-bold rounded-md"
          type="submit"
        >
          Update Book
        </button>
      </form>
    </div>
  );
};
