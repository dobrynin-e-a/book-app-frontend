import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useFetchAllBooksQuery } from "../../redux/features/books/booksApi";
import { BookCard } from "../books/BookCard";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export const Recommended = () => {
  const { data: books = [] } = useFetchAllBooksQuery();

  return (
    <div className="py-16">
      <h2 className="text-3xl font-semibold mb-6">Recommended for you</h2>
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
        {books.length > 0 &&
          books.slice(8, 16).map((book) => (
            <SwiperSlide key={book._id}>
              <BookCard book={book} key={book._id} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};
