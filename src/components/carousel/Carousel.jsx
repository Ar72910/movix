import React, { useRef } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";


import dayjs from "dayjs";
// dayjs servr sei date milt hei voo (2022-12-28) and we want it in (Jan 28 2023)

import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.png";

import "./style.scss";
import CircleRating from "../circleRating/CircleRating";

import Genres from "../genres/Genres";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";






const Carousel = ({ data, loading,endpoint,title }) => {

  const navigation = (dir) => {
    const container = carouselContainer.current;

    const scrollAmount =
      dir === "left" ? container.scrollLeft - (container.offsetWidth + 20) :
        container.scrollLeft + (container.offsetWidth + 20)

    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    })

  }


  const skItem = () => {
    return (
      <div className="skeletonItem">
        <div className="posterBlock" skeleton>
          <div className="textBlock">
            <div className="title" skeleton>
              <div className="data" skeleton></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const carouselContainer = useRef(); // to get a perticular div
  const { url } = useSelector((state) => state.home);
  const navigate = useNavigate();


  return (
    <div className="carousel" >
      <ContentWrapper>
        {title && <div className="carouselTitle">{title}</div>}

        <BsFillArrowLeftCircleFill
          className="carouselLeftNav arrow"
          onClick={() => navigation("left")}
        />
        <BsFillArrowRightCircleFill
          className="carouselRightNav arrow"
          onClick={() => navigation("right")} />

        {!loading ? (
          <div className="carouselItems" ref={carouselContainer}>
            {
              data?.map((item) => {
                const posterUrl = item.poster_path ? url.poster + item.poster_path : PosterFallback
                return (
                  <div
                    key={item.id}
                    className="carouselItem"
                    onClick={()=>
                    navigate(
                      `/${item.media_type || endpoint}/${item.id}`
                    )}>
                    <div className="posterBlock">
                      <Img src={posterUrl} />
                      <CircleRating rating={Math.round(item.vote_average * 10) / 10} />
                      <Genres data={item.genre_ids.slice(0, 2)} />
                    </div>

                    <div className="textBlock">
                      <span className="title">
                        {item.title || item.name}
                      </span>

                      <span className="date">
                        {
                          dayjs(item.release_Date).format(
                            "MMM D, YYYY"
                          )
                        }
                      </span>
                    </div>

                  </div>
                )
              })

            }
          </div>
        ) :
          (

            <div className="loadingSkeleton">
              {skItem()}
              {skItem()}
              {skItem()}
              {skItem()}
              {skItem()}
              {skItem()}

            </div>
          )
        }

      </ContentWrapper>

    </div>
  )
}

export default Carousel