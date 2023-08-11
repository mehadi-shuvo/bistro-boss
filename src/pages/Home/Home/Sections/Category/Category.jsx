import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import img1 from '../../../../../assets/home/slide1.jpg'
import img2 from '../../../../../assets/home/slide2.jpg'
import img3 from '../../../../../assets/home/slide3.jpg'
import img4 from '../../../../../assets/home/slide4.jpg'
import img5 from '../../../../../assets/home/slide5.jpg'
import SectionTitle from "../../../../../components/SectionTitle/SectionTitle";

const Category = () => {
    return (
        <div className="w-4/5 mx-auto">
            <div className="my-10">
                <SectionTitle subTitle={'from 11am to 10 pm'} title={'order online'}></SectionTitle>
                <Swiper
                    slidesPerView={4}
                    spaceBetween={30}
                    freeMode={true}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[FreeMode, Pagination]}
                    className="mySwiper"
                >
                    <SwiperSlide>
                        <img src={img1} alt="" />
                        <h4 className="text-center -mt-20 text-4xl font-bold text-white uppercase">Salads</h4>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={img2} alt="" />
                        <h4 className="text-center -mt-20 text-4xl font-bold text-white uppercase">Pizzas</h4>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={img3} alt="" />
                        <h4 className="text-center -mt-20 text-4xl font-bold text-white uppercase">Soups</h4>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={img4} alt="" />
                        <h4 className="text-center -mt-20 text-4xl font-bold text-white uppercase">Desserts</h4>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={img5} alt="" />
                        <h4 className="text-center -mt-20 text-4xl font-bold text-white uppercase">Salads</h4>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    );
};

export default Category;