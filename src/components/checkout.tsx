"use client";

import { useState } from "react";
import {
    PaymentElement,
    useStripe,
    useElements,
    Elements
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { Button } from "./ui/button";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

function PaymentForm() {
    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    interface HandleSubmitEvent extends React.FormEvent<HTMLFormElement> { }

    interface ConfirmPaymentResult {
        error?: {
            type: string;
            message?: string;
        };
    }

    const handleSubmit = async (e: HandleSubmitEvent): Promise<void> => {
        e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js hasn't yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        setIsLoading(true);

        const { error }: ConfirmPaymentResult = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
            },
        });

        // This point will only be reached if there is an immediate error when
        // confirming the payment. Otherwise, your customer will be redirected to
        // your `return_url`. For some payment methods like iDEAL, your customer will
        // be redirected to an intermediate site first to authorize the payment, then
        // redirected to the `return_url`.
        if (error) {
            if (error.type === "card_error" || error.type === "validation_error") {
                setMessage(error.message ?? null);
            } else {
                setMessage("An unexpected error occurred.");
            }
        } else {
            setMessage(null);
        }

        setIsLoading(false);
    };

    const paymentElementOptions = {
        layout: "accordion",
    };

    return (
        <div>
            <form id="payment-form" onSubmit={handleSubmit}>
                <div>

                    <PaymentElement
                        id="payment-element"
                        options={{ layout: "accordion" as const }}
                    />
                </div>


                <div>
                    <Button className="mt-5" disabled={isLoading || !stripe || !elements} id="submit">
                        <span id="button-text">
                            {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
                        </span>
                    </Button>
                </div>

                {/* Show any error or success messages */}
                {message && <div id="payment-message">{message}</div>}
            </form>
        </div>
    );
}

interface CheckoutFormProps {
    clientSecret: string;
}

export default function CheckoutForm({ clientSecret }: CheckoutFormProps) {
    const appearance = {
        theme: 'stripe',
    };
    return (
        <Elements stripe={stripePromise} options={{ appearance: { theme: "stripe" as const }, clientSecret }}>
            <PaymentForm />
        </Elements>
    );
}