"use client";

import { useEffect, useState } from "react";
import CheckoutForm from "@/components/checkout";

export default function UpgradePage() {
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    // Example: $10 upgrade
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 6900 }), // $69 in cents
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Upgrade to Pro</h1>
      <p className="mb-6">Unlock all premium features for just $69.</p>
      {clientSecret ? (
        <div className="w-full max-w-md">
          <CheckoutForm clientSecret={clientSecret} />
        </div>
      ) : (
        <div>Loading payment form...</div>
      )}
    </div>
  );
}
