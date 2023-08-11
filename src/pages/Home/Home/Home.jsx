import { Helmet } from "react-helmet-async";
import Menu from "./Menu/Menu";
import AboutUs from "./Sections/AboutUs/AboutUs";
import Banner from "./Sections/Banner/Banner";
import Category from "./Sections/Category/Category";
import Featured from "./Sections/Featured/Featured";
import Testimonials from "./Sections/Testimonials/Testimonials";


const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Home</title>
            </Helmet>
            <Banner />
            <Category></Category>
            <AboutUs></AboutUs>
            <Menu></Menu>
            <Featured></Featured>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;