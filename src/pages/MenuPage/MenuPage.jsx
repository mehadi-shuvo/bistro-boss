import { Helmet } from "react-helmet-async";
import Cover from "../../components/Cover/Cover";
import SectionCover from "../../components/SectionCover/SectionCover";
import useMenu from "../../hooks/useMenu";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import MenuItems from "../../components/MenuItems/MenuItems";
import menuBg from '../../assets/menu/banner3.jpg'
import dessertBg from '../../assets/menu/dessert-bg.jpeg'
import soupBg from '../../assets/menu/soup-bg.jpg'
import pizzaBg from '../../assets/menu/pizza-bg.jpg'
import saladBg from '../../assets/menu/salad-bg.jpg'

const MenuPage = () => {
    const [menu] = useMenu();
    const dessert = menu.filter(item => item.category === 'dessert')
    const salad = menu.filter(item => item.category === 'salad')
    const pizza = menu.filter(item => item.category === 'pizza')
    const soup = menu.filter(item => item.category === 'soup')
    const offered = menu.filter(item => item.category === 'offered')
    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Menu</title>
            </Helmet>
            <Cover image={menuBg}
                title={'our menu'}
                details={'Would you like to try a dish?'}
            ></Cover>
            <SectionTitle subTitle="Don't miss" title="Today's Offer"></SectionTitle>
            <MenuItems items={offered}></MenuItems>
            {/* dessert section */}
            <SectionCover
                image={dessertBg}
                title="desserts"
                details="Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
                items={dessert}
            ></SectionCover>
            {/* pizza  */}
            <SectionCover
                image={pizzaBg}
                title="pizzas"
                details="Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
                items={pizza}
            ></SectionCover>
            <SectionCover
                items={salad}
                image={saladBg}
                title="salads"
                details="Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
            >

            </SectionCover>
            <SectionCover
                items={soup}
                title='soups'
                image={soupBg}
                details="Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
            >

            </SectionCover>
        </div>
    );
};

export default MenuPage;