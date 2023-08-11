
import { Elements } from '@stripe/react-stripe-js';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import CheckoutForm from './CheckoutForm';
import { loadStripe } from '@stripe/stripe-js';
import useCarts from '../../../hooks/useCarts';
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PK);

const Payment = () => {
    const [cart] = useCarts()
    const total = cart.reduce((sum, item)=> sum + item.price, 0)
    const price = parseFloat(total.toFixed(2))
    console.log(price);
    return (
        <div>
            <SectionTitle subTitle="Taka de Taka de" title="payment"></SectionTitle>
            <Elements stripe={stripePromise}>
                <CheckoutForm cart={cart} price={price}></CheckoutForm>
            </Elements>

        </div>
    );
};

export default Payment;