
import SectionTitle from "../../../../components/SectionTitle/SectionTitle";
import SingleItem from "../../../shared/SingleItem/SingleItem";
import useMenu from "../../../../hooks/useMenu";



const Menu = () => {

    const [menu] = useMenu();
    const popular = menu.filter(item => item.category === 'popular')
    return (
        <div className="w-4/5 mx-auto my-20">
            <SectionTitle
                subTitle={'Check it out'}
                title={'from our menu'}
            >
            </SectionTitle>

            {/* menu body */}

            <div className="grid md:grid-cols-2 gap-5">
                {
                    popular.map(item=> <SingleItem
                    key={item._id}
                    item={item}
                    ></SingleItem>)
                }
            </div>
        </div>
    );
};

export default Menu;