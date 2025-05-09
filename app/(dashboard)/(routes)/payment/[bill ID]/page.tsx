// app/dashboard/routes/payment/[billId]/page.tsx
'use client'

import { useSearchParams } from 'next/navigation'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import { useEffect, useState } from 'react'

interface Bill {
    id: string
    amount: string
    status: string

}


export default function PaymentPage({ params }: { params: { billId: string } }) {
    const { billId } = params
    const [bill, setBill] = useState<Bill | null>(null)

    useEffect(() => {
        // Simulate fetching the bill details
        setBill({
            id: billId,
            amount: '120.00',
            status: 'Unpaid',
        })
    }, [billId])

    if (!bill) return <div className="text-white p-10">Loading...</div>

    return (
        <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-6">
            <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4">Make a Payment</h1>
                <p className="text-gray-300 mb-6">Pay for Bill ID: <span className="text-white font-semibold">{bill.id}</span></p>

                <div className="bg-gray-700 p-4 rounded mb-6">
                    <div className="flex justify-between">
                        <span>Amount Due:</span>
                        <span className="font-bold text-green-400">${bill.amount}</span>
                    </div>
                    <div className="flex justify-between mt-2">
                        <span>Status:</span>
                        <span className="text-yellow-400">{bill.status}</span>
                    </div>
                </div>

                <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '' }}>
                    <PayPalButtons
                        style={{ layout: 'vertical' }}

                        createOrder={async (data, actions) => {
                            return actions.order?.create({
                                purchase_units: [
                                    {
                                        amount: {



                                            value: bill.amount,
                                        },
                                    },
                                ],
                            })
                        }}

                        onApprove={async (data, actions) => {
                            const details = await actions.order?.capture()
                            alert(`Transaction completed by ${details?.payer?.name?.given_name}`)
                            // Optionally: call your backend to update bill status
                        }}
                    />
                </PayPalScriptProvider>
            </div>
        </div>
    )
}
