
import SingleItem from "../../pages/shared/SingleItem/SingleItem";

const MenuItems = ({ items }) => {
    return (
        <div>
            <div className="grid md:grid-cols-2 gap-5 w-4/5 mx-auto">
                {
                    items.map(item => <SingleItem
                        key={item._id}
                        item={item}
                    ></SingleItem>)
                }
            </div>
        </div>
    );
};

export default MenuItems;