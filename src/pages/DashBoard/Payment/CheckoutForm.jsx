import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider/AuthProvider";

const CheckoutForm = ({ cart, price }) => {

    const stripe = useStripe();
    const elements = useElements();
    const { user } = useContext(AuthContext)
    const [error, setError] = useState('')
    const [axiosSecure] = useAxiosSecure();
    const [clientSecret, setClientSecret] = useState("");
    const [transitionId, setTransitionId] = useState('');
    const [isProcessing, setIsProcessing] = useState(false)

    useEffect(() => {
        if (price > 0) {
            axiosSecure.post('/create-payment-intent', { price })
                .then(res => {
                    setClientSecret(res.data.clientSecret)
                })
        }
    }, [price, axiosSecure])

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }
        const { error } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
            setError(error.message);
        } else {
            setError('');
            // console.log('[PaymentMethod]', paymentMethod);
        }
        setIsProcessing(true);

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user?.displayName || 'anonymous',
                        email: user?.email || "unknown",
                    },
                },
            },
        );

        if (confirmError) {
            console.log(confirmError);
        }
        setIsProcessing(false);

        if (paymentIntent.status === 'succeeded') {
            setTransitionId(paymentIntent.id);
            const payment = {
                transitionId: paymentIntent.id,
                email: user?.email,
                date: new Date(),
                price,
                quantity: cart.length,
                cartItems: cart.map(item => item._id),
                menuItems: cart.map(item => item.foodId),
                status: 'service pending',
                itemNames: cart.map(item => item.name)
            }
            axiosSecure.post('/payment', payment)
                .then(res => {
                    console.log(res.data);
                    // if (res.data.insertResult.insertedId) {
                    //     //display confirm
                    // }
                })
        }

    }
    return (
        <div>
            <form className="bg-slate-200 w-4/5 mx-auto rounded-lg p-10" onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <div className="flex justify-center">
                    <button className="btn btn-success w-1/4 mt-5" type="submit" disabled={!stripe || !clientSecret || isProcessing}>
                        Pay
                    </button>
                </div>
            </form>
            <div>
                {
                    error && <p className="text-red-600 text-lg text-center">{error}</p>
                }
                {
                    transitionId && <p className="text-green-500 text-lg">Payment successfully done. Your transition id is : {transitionId}</p>
                }
            </div>
        </div>
    );
};

export default CheckoutForm;