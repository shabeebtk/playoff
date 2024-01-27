import { useEffect, useState } from "react";
import useRazorpay from "react-razorpay";
import { BaseUrl } from "../../constant/BaseUrl";
import axios from "axios";
import { RazorpayKey } from '../../constant/RazorPayKey'

function RazorpayPage(props) {
    const [Razorpay] = useRazorpay();

    const showRazorpay = async () => {
        const data = await axios.post(`${BaseUrl}user/startpayment`, {
            name: props.user['player_username'],
            amount: props.total_price
        },
            {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            })
            .then((res) => {
                return res;
            })
            .catch((response) => {
                console.log(response)
            })

        var options = {
            key: RazorpayKey,
            amount: data.data.payment.amount,
            currency: "INR",
            name: "playoff",
            description: "pay now to confirm the booking",
            image: '',
            order_id: data.data.payment.id,
            handler: function (response) {
                handlePaymentSuccess(response);
            },
            prefill: {
                name: props.user.player_username,
                email: props.user.email,
                contact: props.user.phone,
            },
            notes: {
                address: "Razorpay Corporate Office",
            },
            theme: {
                color: "#3399cc",
            },
        };

        var rzp1 = new Razorpay(options);
        rzp1.open();
        rzp1.on('error', (err) => console.log(err))
    };


    const handlePaymentSuccess = async (response) => {
        try {

            response.booking_id = props.booking_id
            await axios.post(`${BaseUrl}user/payment/success`, response,
                {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    }
                }
            )
                .then((res) => {
                    console.log("Everything is OK!");
                    props.updateBookings()
                })
                .catch((err) => {
                    console.log(err);
                });
        } catch (error) {
            console.log(console.error());
        }
    };

    return (
        <button onClick={showRazorpay} className="btn btn-primary btn-block">
            Pay Now
        </button>
    );
}


export default RazorpayPage