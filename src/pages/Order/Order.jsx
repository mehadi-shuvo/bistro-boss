import Cover from "../../components/Cover/Cover";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import orderBg from '../../assets/shop/banner2.jpg'
import { useState } from "react";
import './Order.css'
import useMenu from "../../hooks/useMenu";
import CategoryCards from "../../components/CategoryCards/CategoryCards";
import { useParams } from "react-router-dom";


const Order = () => {
    const foodCategories = ['salads', 'pizzas', 'soups', 'desserts', 'drinks']
    const {category} = useParams()
    const initialIndex = foodCategories.indexOf(category)
    console.log(initialIndex)
    const [tabIndex, setTabIndex] = useState(initialIndex)
    const [menu] = useMenu();
    const dessert = menu.filter(item => item.category === 'dessert')
    const salad = menu.filter(item => item.category === 'salad')
    const pizza = menu.filter(item => item.category === 'pizza')
    const soup = menu.filter(item => item.category === 'soup')
    const drinks = menu.filter(item => item.category === 'drinks')
    return (
        <div>
            <Cover
                image={orderBg}
                title={'order food'}
                details='would you like to try a dish?'
            ></Cover>

            <div className="w-4/5 mx-auto my-20">
                <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                    <TabList className="mb-5 flex justify-center items-center">
                        <Tab>salads</Tab>
                        <Tab>pizzas</Tab>
                        <Tab>soups</Tab>
                        <Tab>desserts</Tab>
                        <Tab>drinks</Tab>
                    </TabList>
                    <TabPanel>
                        <CategoryCards items={salad}></CategoryCards>
                    </TabPanel>
                    <TabPanel>
                        <CategoryCards items={pizza}></CategoryCards>
                    </TabPanel>
                    <TabPanel>
                        <CategoryCards items={soup}></CategoryCards>
                    </TabPanel>
                    <TabPanel>
                        <CategoryCards items={dessert}></CategoryCards>
                    </TabPanel>
                    <TabPanel>
                        <CategoryCards items={drinks}></CategoryCards>
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    );
};

export default Order;