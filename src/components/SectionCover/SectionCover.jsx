
import { Parallax } from 'react-parallax';
import MenuItems from '../MenuItems/MenuItems';
import { Link } from 'react-router-dom';

const SectionCover = ({ image, title, details,items }) => {
    return (
        <div className='my-20'>
            <div>
                <Parallax
                    blur={{ min: -30, max: 30 }}
                    bgImage={image}
                    bgImageAlt="the dog"
                    strength={-200}
                >
                    <div className={`hero h-[400px]`}>
                        <div className="w-4/5 mx-auto bg-[rgba(21,21,21,0.6)] text-center text-white p-20">
                            <h1 className="mb-5 font-bold text-5xl uppercase">{title}</h1>
                            <p className="text-base font-semibold">{details}</p>
                        </div>
                    </div>
                </Parallax>
            </div>
            <div className='mt-10 tex'>
                <MenuItems items={items}></MenuItems>
                <div className='text-center mt-7'>
                <Link className='uppercase text-xl py-2 font-semibold border-b-2 border-slate-800 rounded-lg text-center' to={`/order/${title}`}>order your favourite food</Link>
                </div>
            </div>
        </div>

    );
};

export default SectionCover;