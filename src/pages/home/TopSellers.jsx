import { useState } from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useFetchAllBooksQuery } from "../../redux/features/books/booksApi";
import { BookCard } from "../books/BookCard";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const categories = [
  "Choose a genre",
  "Business",
  "Fiction",
  "Horror",
  "Adventure",
];

export const TopSellers = () => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const { data: books = [] } = useFetchAllBooksQuery();

  const filteredBooks =
    selectedCategory === categories[0]
      ? books
      : books.filter(
          (book) => book.category === selectedCategory.toLowerCase()
        );

  return (
    <div className="py-10">
      <h2 className="text-3xl font-semibold mb-6">Top Sellers</h2>
      {/* category filtering */}
      <div className="mb-8 flex items-center">
        <select
          className="border bg-[#EAEAEA] border-gray-300 rounded-md px-4 py-2 focus:outline-none"
          id="category"
          name="category"
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <Swiper
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 50,
          },
          1180: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
        className="mySwiper"
        modules={[Pagination, Navigation]}
        navigation={true}
        slidesPerView={1}
        spaceBetween={30}
      >
        {filteredBooks.length > 0 &&
          filteredBooks.map((book) => (
            <SwiperSlide key={book._id}>
              <BookCard book={book} key={book._id} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};
