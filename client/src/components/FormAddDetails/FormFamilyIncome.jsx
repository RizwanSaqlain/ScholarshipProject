import React from "react";
import { Button, Label, Select, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Forms from "../../pages/Notifications";

const FormFamilyIncome = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const delay = (d) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("Success");
      }, d * 1000);
    });
  };
  const onSubmit = async (data) => {
    await toast.promise(
      delay(3),
      {
        pending: "In Progress...",
        success: "Submitted Successfully!",
        error: "Failed to submit!",
      },
      {
        autoClose: 3050,
      }
    );
    //simulating network delay or others
    console.log(data);
  };

  return (
    <>
      <ToastContainer />
      <Forms/>
      <div>
        <div className="p-8 m-4 flex flex-col items-center mt-12">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white flex flex-col gap-4 border-2 p-5 rounded-md max-w-4xl w-full"
          >
            <h2 className="text-center text-red-600 text-2xl font-bold mb-8">
              Family/Income Details
            </h2>

            <div className="flex gap-4">
              {/* Father's Name */}
              <div className="w-1/2">
                <div className="mb-2 block">
                  <Label value="Name of the Father/Guardian:" />
                </div>
                <TextInput
                  type="text"
                  {...register("FathersName", {
                    required: "This field is required",
                  })}
                  className="w-full text-sm"
                />
                {errors.FathersName && (
                  <span className="text-red-500">
                    {errors.FathersName.message}
                  </span>
                )}
              </div>

              {/* Mother's Name */}
              <div className="w-1/2">
                <div className="mb-2 block">
                  <Label value="Name of the Mother/Guardian:" />
                </div>
                <TextInput
                  type="text"
                  {...register("MothersName", {
                    required: "This field is required",
                  })}
                  className="w-full text-sm"
                />
                {errors.MothersName && (
                  <span className="text-red-500">
                    {errors.MothersName.message}
                  </span>
                )}
              </div>
            </div>

            <div className="flex gap-4">
              {/* Father's Occupation */}
              <div className="w-1/2">
                <div className="mb-2 block">
                  <Label value="Father's Occupation:" />
                </div>
                <TextInput
                  type="text"
                  {...register("FathersOccupation", {
                    required: "This field is required",
                  })}
                  className="w-full text-sm"
                />
                {errors.FathersOccupation && (
                  <span className="text-red-500">
                    {errors.FathersOccupation.message}
                  </span>
                )}
              </div>

              {/* Mother's Occupation */}
              <div className="w-1/2">
                <div className="mb-2 block">
                  <Label value="Mother's Occupation:" />
                </div>
                <TextInput
                  type="text"
                  {...register("MothersOccupation", {
                    required: "This field is required",
                  })}
                  className="w-full text-sm"
                />
                {errors.MothersOccupation && (
                  <span className="text-red-500">
                    {errors.MothersOccupation.message}
                  </span>
                )}
              </div>
            </div>

            <div className="flex gap-4">
              {/* Father's Designation */}
              <div className="w-1/2">
                <div className="mb-2 block">
                  <Label value="Father's Designation:" />
                </div>
                <TextInput
                  type="text"
                  {...register("FathersDesignation", {
                    required: "This field is required",
                  })}
                  className="w-full text-sm"
                />
                {errors.FathersDesignation && (
                  <span className="text-red-500">
                    {errors.FathersDesignation.message}
                  </span>
                )}
              </div>

              {/* Mother's Designation */}
              <div className="w-1/2">
                <div className="mb-2 block">
                  <Label value="Mother's Designation:" />
                </div>
                <TextInput
                  type="text"
                  {...register("MothersDesignation", {
                    required: "This field is required",
                  })}
                  className="w-full text-sm"
                />
                {errors.MothersDesignation && (
                  <span className="text-red-500">
                    {errors.MothersDesignation.message}
                  </span>
                )}
              </div>
            </div>

            <div className="flex gap-4">
              {/* Father's Mobile Number */}
              <div className="w-1/2">
                <div className="mb-2 block">
                  <Label value="Father's Mobile Number:" />
                </div>
                <TextInput
                  type="text"
                  {...register("FathersMobile", {
                    required: "This field is required",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Invalid mobile number",
                    },
                  })}
                  className="w-full text-sm"
                />
                {errors.FathersMobile && (
                  <span className="text-red-500">
                    {errors.FathersMobile.message}
                  </span>
                )}
              </div>

              {/* Mother's Mobile Number */}
              <div className="w-1/2">
                <div className="mb-2 block">
                  <Label value="Mother's Mobile Number:" />
                </div>
                <TextInput
                  type="text"
                  {...register("MothersMobile", {
                    required: "This field is required",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Invalid mobile number",
                    },
                  })}
                  className="w-full text-sm"
                />
                {errors.MothersMobile && (
                  <span className="text-red-500">
                    {errors.MothersMobile.message}
                  </span>
                )}
              </div>
            </div>

            <div className="flex gap-4">
              {/* Family Annual Income */}
              <div className="w-1/2">
                <div className="mb-2 block">
                  <Label value="Family Annual Income:" />
                </div>
                <Select
                  {...register("Income", {
                    required: "Please select annual income",
                  })}
                  defaultValue=""
                  className="w-full text-sm"
                >
                  <option value="" disabled>
                    Select annual income
                  </option>
                  <option value="less_100k">Less than 100,000</option>
                  <option value="100k_200k">100,000 - 200,000</option>
                  <option value="200k_500k">200,000 - 500,000</option>
                  <option value="500k_800k">500,000 - 800,000</option>
                </Select>
                {errors.Income && (
                  <span className="text-red-500">{errors.Income.message}</span>
                )}
              </div>
            </div>

            <Button type="submit" disabled={isSubmitting} className="text-sm mt-4 p-2">
              Submit
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default FormFamilyIncome;
