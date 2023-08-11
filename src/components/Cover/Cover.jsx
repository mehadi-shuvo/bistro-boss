import { Parallax } from 'react-parallax';

const Cover = ({ image, title, details }) => {
    return (
        <div className='mb-20'>
            <Parallax
                blur={{ min: -30, max: 30 }}
                bgImage={image}
                bgImageAlt="the dog"
                strength={-200}
            >
                <div className={`hero h-[600px]`}>
                    <div className="w-4/5 mx-auto bg-[rgba(21,21,21,0.6)] text-center text-white py-28">
                        <h1 className="mb-5 font-bold text-7xl uppercase">{title}</h1>
                        <p className="text-2xl font-semibold uppercase">{details}</p>
                    </div>
                </div>
            </Parallax>
        </div>

    );
};

export default Cover;