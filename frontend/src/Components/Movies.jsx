import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Movies = ({ movieData, title, search = false }) => {
  const settings = {
    infinite: true,
    speed: 900,
    slidesToShow: 8,
    slidesToScroll: 8,
  };

  return (
    <div className="grid grid-cols-8 gap-4">
      <div className="col-span-full">
        <h1 className="text-4xl text-start font-bold mx-10">
          {title && search ? "Search Result For : " : ""}{" "}
          {title && title.charAt(0).toUpperCase() + title.slice(1)} {" "}
          {search && movieData.length}
        </h1>
      </div>
      {movieData && movieData.length > 0 && (
        <Slider {...settings} className="col-span-full">
          {movieData.map((movie) => (
            <div key={movie.id} className="px-2 col-span-1">
              <div className="relative">
                <div className="bg-gray-800 text-white rounded-lg overflow-hidden shadow-md max-w-72 cursor-pointer">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-auto "
                    style={{ aspectRatio: "2/3" }} // Maintain aspect ratio
                  />
                  <div className="p-4 absolute top-0 left-0 right-0 bottom-0 opacity-0 transition-opacity duration-300 bg-black bg-opacity-70 hover:opacity-100 flex items-center justify-center">
                    <div className="text-center">
                      <h3 className="text-xl font-bold">{movie.title}</h3>
                      <p className="text-sm mt-2">
                        Release Date: {movie.release_date}
                      </p>
                      <p className="text-sm mt-2">
                        Rating: {movie.vote_average} / 10
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default Movies;
