
import featuredImg from '../../../../../assets/home/featured.jpg'
import './Featured.css'
const Featured = () => {
    return (
        <div className="featured-item my-20 bg-fixed">
            <div className="w-4/5 mx-auto text-white pt-20">
                <div className="text-center w-[300px] mx-auto">
                    <h3 className="text-xl text-[#D99904] border-b-2 pb-5">--- Check it out ---</h3>
                    <h3 className="text-4xl uppercase text-white border-b-2 pb-6 mb-12">featured food</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-7 md:gap-16 pb-20 items-center">
                    <img className="" src={featuredImg} alt="" />
                    <div>
                        <p className="text-2xl">March 20, 2028</p>
                        <p className="text-2xl uppercase my-2">where can i get some?</p>
                        <p className="text-xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Error voluptate facere, deserunt dolores maiores quod nobis quas quasi. Eaque repellat recusandae ad laudantium tempore consequatur consequuntur omnis ullam maxime tenetur.</p>
                        <button className="UnderLine-btn hover:mt-[3px]">Order Now</button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Featured;