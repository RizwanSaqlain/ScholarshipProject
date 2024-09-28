import React from "react";
import { Button, Label, Select, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Forms from "../../pages/Notifications";

const FormContactDetails = () => {
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
      <div className="p-8 m-4 mt-12 flex flex-col items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white flex flex-col gap-4 border-2 p-5 rounded-md max-w-4xl w-full"
        >
          <h2 className="text-center text-red-600 text-2xl font-bold mb-8">
            Address and Contact Details
          </h2>

          {/* Mobile Number and Alternate Mobile Number */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:w-1/2">
              <div className="mb-2 block">
                <Label value="Mobile Number" />
              </div>
              <TextInput
                type="text"
                {...register("MobileNumber", {
                  required: "This field is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Invalid mobile number. It should be 10 digits.",
                  },
                })}
              />
              {errors.MobileNumber && (
                <span className="text-red-500">
                  {errors.MobileNumber.message}
                </span>
              )}
            </div>
            <div className="w-full sm:w-1/2">
              <div className="mb-2 block">
                <Label value="Alternate Mobile Number (Optional)" />
              </div>
              <TextInput type="text" {...register("AlternateMobileNumber")} />
            </div>
          </div>

          {/* Email Address and Alternate Email Address */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:w-1/2">
              <div className="mb-2 block">
                <Label value="Email Address" />
              </div>
              <TextInput
                type="email"
                {...register("EmailAddress", {
                  required: "This field is required",
                })}
              />
              {errors.EmailAddress && (
                <span className="text-red-500">
                  {errors.EmailAddress.message}
                </span>
              )}
            </div>
            <div className="w-full sm:w-1/2">
              <div className="mb-2 block">
                <Label value="Alternate Email Address (Optional)" />
              </div>
              <TextInput type="email" {...register("AlternateEmailAddress")} />
            </div>
          </div>

          {/* Permanent and Current Address */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:w-1/2">
              <div className="mb-2 block">
                <Label value="Permanent Address" />
              </div>
              <TextInput
                type="text"
                {...register("PermanentHouseNo")}
                placeholder="House No"
              />
              <TextInput
                type="text"
                {...register("PermanentStreet")}
                placeholder="Street"
              />
              <TextInput
                type="text"
                {...register("PermanentVillage", {
                  required: "Village/Tehsil/Block is required",
                })}
                placeholder="Village/Tehsil/Block"
              />
              {errors.PermanentVillage && (
                <span className="text-red-500">
                  {errors.PermanentVillage.message}
                </span>
              )}
              <TextInput
                type="text"
                {...register("PermanentCity", {
                  required: "City is required",
                })}
                placeholder="City"
              />
              {errors.PermanentCity && (
                <span className="text-red-500">
                  {errors.PermanentCity.message}
                </span>
              )}
              <TextInput
                type="text"
                {...register("PermanentStateUT", {
                  required: "State/UT is required",
                })}
                placeholder="State/UT"
              />
              {errors.PermanentStateUT && (
                <span className="text-red-500">
                  {errors.PermanentStateUT.message}
                </span>
              )}
              <TextInput
                type="text"
                {...register("PermanentDistrict", {
                  required: "District is required",
                })}
                placeholder="District"
              />
              {errors.PermanentDistrict && (
                <span className="text-red-500">
                  {errors.PermanentDistrict.message}
                </span>
              )}
              <TextInput
                type="number"
                {...register("PermanentPinCode", {
                  required: "Pin Code is required",
                })}
                placeholder="Pin Code"
              />
              {errors.PermanentPinCode && (
                <span className="text-red-500">
                  {errors.PermanentPinCode.message}
                </span>
              )}
            </div>
            <div className="w-full sm:w-1/2">
              <div className="mb-2 block">
                <Label value="Current Address" />
              </div>
              <TextInput
                type="text"
                {...register("CurrentHouseNo")}
                placeholder="House No"
              />
              <TextInput
                type="text"
                {...register("CurrentStreet")}
                placeholder="Street"
              />
              <TextInput
                type="text"
                {...register("CurrentVillage", {
                  required: "Village/Tehsil/Block is required",
                })}
                placeholder="Village/Tehsil/Block"
              />
              {errors.CurrentVillage && (
                <span className="text-red-500">
                  {errors.CurrentVillage.message}
                </span>
              )}
              <TextInput
                type="text"
                {...register("CurrentCity", {
                  required: "City is required",
                })}
                placeholder="City"
              />
              {errors.CurrentCity && (
                <span className="text-red-500">
                  {errors.CurrentCity.message}
                </span>
              )}
              <TextInput
                type="text"
                {...register("CurrentState", {
                  required: "State is required",
                })}
                placeholder="State"
              />
              {errors.CurrentState && (
                <span className="text-red-500">
                  {errors.CurrentState.message}
                </span>
              )}
              <TextInput
                type="text"
                {...register("CurrentDistrict", {
                  required: "District is required",
                })}
                placeholder="District"
              />
              {errors.CurrentDistrict && (
                <span className="text-red-500">
                  {errors.CurrentDistrict.message}
                </span>
              )}
              <TextInput
                type="number"
                {...register("CurrentPinCode", {
                  required: "Pin Code is required",
                })}
                placeholder="Pin Code"
              />
              {errors.CurrentPinCode && (
                <span className="text-red-500">
                  {errors.CurrentPinCode.message}
                </span>
              )}
            </div>
          </div>

          <Button type="submit" disabled={isSubmitting} className="text-sm mt-4 p-2">
            Submit
          </Button>
        </form>
      </div>
    </>
  );
};

export default FormContactDetails;
