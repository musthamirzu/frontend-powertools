import {
  FaClipboardCheck,
  FaShippingFast,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

export default function OrderTracker({ status }) {
  if (status === "cancelled") {
    return (
      <div className="mt-6 bg-red-50 border border-red-200 rounded-2xl p-5">
        <div className="flex items-center gap-3">
          <FaTimesCircle className="text-red-600 text-2xl" />

          <div>
            <h3 className="font-bold text-red-600">
              Order Cancelled
            </h3>

            <p className="text-sm text-gray-500">
              This order has been cancelled.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const steps = [
    {
      key: "placed",
      title: "Placed",
      icon: <FaClipboardCheck />,
    },
    {
      key: "shipped",
      title: "Shipped",
      icon: <FaShippingFast />,
    },
    {
      key: "delivered",
      title: "Delivered",
      icon: <FaCheckCircle />,
    },
  ];

  const currentStep = steps.findIndex(
    (step) => step.key === status
  );

  return (
    <div className="my-8">

      <h3 className="text-lg font-semibold text-gray-800 mb-6">
        Order Tracking
      </h3>

      <div className="flex items-center justify-between">

        {steps.map((step, index) => (
          <div
            key={step.key}
            className="flex items-center flex-1"
          >
            {/* Circle */}
            <div className="flex flex-col items-center relative">

              <div
                className={`
                  w-14
                  h-14
                  rounded-full
                  flex
                  items-center
                  justify-center
                  text-xl
                  shadow-md
                  transition-all
                  duration-300

                  ${
                    index <= currentStep
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-500"
                  }
                `}
              >
                {step.icon}
              </div>

              <span
                className={`
                  mt-3
                  text-sm
                  font-semibold
                  whitespace-nowrap

                  ${
                    index <= currentStep
                      ? "text-green-600"
                      : "text-gray-500"
                  }
                `}
              >
                {step.title}
              </span>
            </div>

            {/* Line */}
            {index !== steps.length - 1 && (
              <div
                className={`
                  flex-1
                  h-1
                  mx-3
                  rounded-full
                  transition-all
                  duration-300

                  ${
                    index < currentStep
                      ? "bg-green-500"
                      : "bg-gray-300"
                  }
                `}
              />
            )}
          </div>
        ))}

      </div>
    </div>
  );
}