import FoodCard from "../FoodCard/FoodCard";

const CategoryCards = ({items}) => {
    return (
        <div className="grid grid-cols-3 gap-5">
            {
                items.map(item=> <FoodCard
                key={item._id}
                item={item}
                ></FoodCard>)
            }
        </div>
    );
};

export default CategoryCards;