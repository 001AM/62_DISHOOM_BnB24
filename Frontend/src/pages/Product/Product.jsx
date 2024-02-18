import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../config";
import Stack from "@mui/material/Stack";
import ReviewCard from "../../components/ReviewCard";
import axiosInstance from "../../axios";
import { Link } from "react-router-dom";
function Product() {
  const { product_id } = useParams();
  const [images, setImages] = useState([]);
  const [clickedImageIndex, setClickedImageIndex] = useState(0);
  const [starRating, setStarRating] = useState(0);
  const [comment, setComment] = useState("");
  const [info, setInfo] = useState();
  const [allComment, setAllComment] = useState();
  // Function to handle star rating click

  const handleStarClick = (rating) => {
    setStarRating(rating);
  };

  // Number of reviews and total number of reviews
  const numberOfReviews = 103;
  const totalReviews = 5;

  const handleImageClick = (index) => {
    setClickedImageIndex(index);
  };
  useEffect(() => {
    axios
      .get(`${BASE_URL}/product/get_products/?product_id=${product_id}`)
      .then((res) => {
        const itemsData = res?.data?.images.map((item, index) => ({
          image: `${BASE_URL}${item.product_image}`,
        }));
        setImages(itemsData);
        setInfo(res?.data);
        console.log(itemsData);
        axios
        .get(`${BASE_URL}/comment/get_comments/?product_id=${product_id}`)
        .then((res) => {
            console.log(res?.data)
          setAllComment(res?.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
   
  }, [product_id]);
  const handleComment = (e) => {
    setComment(`${e.target.value}`);
  };
  console.log(allComment)
  const PostSubmit = () => {
    console.log(comment,starRating)
    const formdata = new FormData();
    formdata.append('comment', comment);
    formdata.append('rating', starRating);
    formdata.append('product', info.id);
    console.log(formdata);
    axiosInstance
      .post(`/comment/comments/`, formdata)
      .then((res) => {
        console.log(res?.data);
        setStarRating(0)
        setComment("")
        const newComment = {
            "comment": comment,
            "rating": starRating,
            "user": {
              'username':'soham'
            },
            "product": {
              // product details
            }
          };
      
          // Update the state by appending the new comment
        setAllComment(prevComments => [...prevComments, newComment]);
        
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  console.log(images);
  console.log(`${images[0]?.image}`);
  return (
    <div className="grid grid-cols-1 gap-6 px-2 sm:grid-cols-6 md:grid-cols-12">
      <div className="col-span-1 md:col-span-7 sm:col-span-6">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-6 md:grid-cols-8">
          <div className="hidden col-span-1 overflow-y-auto sm:block">
            {images.map((image, index) => (
              <div
                key={index}
                className="w-full p-1 my-2 border-2 rounded-sm border-blue-primary row"
                onClick={() => handleImageClick(index)}
              >
                <img
                  src={`${images[index]?.image}`}
                  alt={`carousel image ${index}`}
                  className="w-auto h-auto"
                />
              </div>
            ))}
          </div>
          <div className="w-full col-span-1 md:w-4/5 md: sm:col-span-5 md:col-span-7">
            <div className="w-full p-2 border-2 rounded-lg row border-blue-primary">
              <img
                src={images[clickedImageIndex]?.image}
                alt="carousel image"
                className="w-full h-auto"
              />
            </div>
          </div>
          <div className="flex col-span-1 gap-2 p-1 overflow-x-auto overflow-y-hidden border-2 rounded-lg h-50 sm:hidden border-blue-primary ">
            {images.map((image, index) => (
              <div
                key={index}
                className="w-full p-2 my-2 border-2 rounded-lg row border-blue-primary"
                onClick={() => handleImageClick(index)}
              >
                <img
                  src={`${images[index]?.image}`}
                  alt={`carousel image ${index}`}
                  className="w-auto h-auto"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col col-span-1 md:col-span-5 sm:col-span-6">
        <span className="text-xl font-bold sm:text-2xl">{info?.name}</span>
        <span>{info?.description}</span>
      </div>

      <div className="flex items-center col-span-1 mx-4 overflow-x-auto border-b-4 border-black md:flex sm:col-span-6 md:col-span-12 md:mx-10">
        <div className="flex flex-grow flex-shrink-0 space-x-2 overflow-x-auto flex-nowrap">
          <div className={`p-6 m-2 text-2xl font-bold cursor-pointer`}>
            Anaylitcs
          </div>
        </div>
        <div className="flex justify-center items-center ">
        <Link to="/analytics" className="bg-green-500 p-4 rounded-lg text-white9">See More Anaylitcs</Link></div>
      </div>
      
      {/* <div className="col-span-1 sm:col-span-6 md:col-span-12"></div> */}
      <div className="col-span-1 sm:col-span-6 md:col-span-12">
        <div
          className="col-span-12 p-4 rounded-lg shadow-xl card"
          style={{ margin: "10px" }}
        >
          <h1 style={{ textAlign: "center" }}>Custom Review</h1>
          {/* Star Rating Bar */}
          <Stack spacing={1}>
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              {[1, 2, 3, 4, 5].map((rating) => (
                <span
                  key={rating}
                  className={`cursor-pointer ${
                    rating <= starRating ? "text-yellow-500" : "text-gray-300"
                  }`}
                  onClick={() => handleStarClick(rating)}
                >
                  ★
                </span>
              ))}
              <span className="ml-2 text-lg font-semibold">
                {starRating} / 5
              </span>
            </div>
            {/* Review Content */}
          </Stack>
          <p className="m-2 text-center text-gray-500">
            {numberOfReviews} reviews based on {totalReviews} total
          </p>
          <textarea
            className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write your review here"
            rows={4}
            onChange={(e) => handleComment(e)}
            value={comment}
          ></textarea>
          <div className="flex justify-center">
            <button
              className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
              onClick={() => {
                PostSubmit();
              }}
            >
              Post Review
            </button>
          </div>
        </div>
      </div>
      <div className="col-span-1 sm:col-span-6 md:col-span-12">
        {allComment && allComment.map((data, index) => (
          <ReviewCard
            key={index} // Add a unique key prop for each item in the list
            customerName={data?.username}
            rating={data?.rating}
            review={data?.comment}
          />
        ))}

      </div>
    </div>
  );
}

export default Product;
