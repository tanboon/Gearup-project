"use client";
import CustomButton from "@/components/CustomButton";
import getPayment from "@/libs/getPayment";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
export default function checkoutSuccess({
  params,
}: {
  params: { pid: string };
}) {
  const { data: session } = useSession();
  const router = useRouter();
  const [payment, setPayment] = useState<string>();
  useEffect(() => {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Your purchase was successful",
      showConfirmButton: false,
      timer: 1500,
    });

    const fetchPayment = async () => {
      if (session)
        var payment = await getPayment(params.pid, session.user.token);
      console.log(payment);
      setPayment(payment.data[0].reciept);
    };
    fetchPayment();
  }, []);

  const handleClickInvoice = () => {
    window.open(payment, "_blank");
  };
  const handleClickBooking = () => {
    router.push("/booking");
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-6">You're all set</h2>
          <h2 className="text-3xl font-bold mb-6">
            Thank you for your purchase!
          </h2>
          <p className="text-lg">
            Your purchase ID is:{" "}
            <span className="text-primary-blue font-bold">{params.pid}</span>
          </p>
        </div>
        <div className="flex flex-row pt-10 w-full ">
          <CustomButton
            title="Invoice"
            containerStyles="transition-transform duration-500 ease-in-out hover:scale-110 w-full py-[16px] rounded-full bg-primary-blue"
            handleClick={handleClickInvoice}
          />
          <div className="mx-5"></div>
          <CustomButton
            title="View All Bookings"
            containerStyles="transition-transform duration-500 ease-in-out hover:scale-110 w-full py-[16px] rounded-full bg-primary-blue"
            rightIcon="/right-arrow.svg"
            handleClick={handleClickBooking}
          />
        </div>
      </div>
    </>
  );
}
