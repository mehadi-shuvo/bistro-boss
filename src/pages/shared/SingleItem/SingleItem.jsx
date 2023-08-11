
const SingleItem = ({item}) => {
    const {image, name, recipe, price} = item
    return (
        <div className="flex gs">
            <img className="w-[118px] h-[104px] rounded-r-[200px] rounded-b-[200px]" src={image} alt="" />
            <div className=" ml-8">
                <p className="text-xl uppercase text-[#151515]">{name} ------------</p>
                <p className="text-base text-[#737373] mt-2">{recipe}</p>
            </div>
            <h4 className="text-[#bb8506] text-xl">${price}</h4>
        </div>
    );
};

export default SingleItem;