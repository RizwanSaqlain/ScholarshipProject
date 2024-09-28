import React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Label, Select, TextInput } from "flowbite-react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Forms from "../../pages/Notifications";


const FormPersonal = () => {
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

      <div className="p-8 m-4 flex flex-col items-center mt-12 ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white flex flex-col gap-4 border-2 p-5 rounded-md max-w-4xl w-full"
        >
          <h2 className="text-center text-red-600 text-2xl font-bold mb-8">
            Personal Details
          </h2>

          {/* Candidate Id and Name of the Candidate */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:w-1/2">
              <div className="mb-2 block">
                <Label value="Candidate Id" />
              </div>
              <TextInput
                type="number"
                {...register("CandidateId", {
                  required: {
                    value: true,
                    message: "This field is required",
                  },
                })}
                className="w-full text-sm"
              />
              {errors.CandidateId && (
                <span className="text-red-500">
                  {errors.CandidateId.message}
                </span>
              )}
            </div>
            <div className="w-full sm:w-1/2">
              <div className="mb-2 block">
                <Label value="Name of the Candidate" />
              </div>
              <TextInput
                type="text"
                {...register("CandidateName", {
                  required: {
                    value: true,
                    message: "This field is required",
                  },
                })}
                className="w-full text-sm"
              />
              {errors.CandidateName && (
                <span className="text-red-500">
                  {errors.CandidateName.message}
                </span>
              )}
            </div>
          </div>

          {/* Gender and Domicile of J&K */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:w-1/2">
              <div className="mb-2 block">
                <Label value="Gender" />
              </div>
              <Select
                {...register("Gender", { required: "Please select a gender" })}
                defaultValue=""
                className="w-full text-sm"
              >
                <option value="" disabled>
                  Select Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
              </Select>
              {errors.Gender && (
                <span className="text-red-500">{errors.Gender.message}</span>
              )}
            </div>
            <div className="w-full sm:w-1/2">
              <div className="mb-2 block">
                <Label value="Whether Domicile of J&K?" />
              </div>
              <Select
                {...register("Domicile", {
                  required: "Please select an option",
                })}
                defaultValue=""
                className="w-full text-sm"
              >
                <option value="" disabled>
                  Select Domicile Status
                </option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </Select>
              {errors.Domicile && (
                <span className="text-red-500">{errors.Domicile.message}</span>
              )}
            </div>
          </div>

          {/* Date of Birth and Caste Category */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:w-1/2">
              <div className="mb-2 block">
                <Label value="Date of Birth" />
              </div>
              <TextInput
                type="date"
                {...register("DateOfBirth", {
                  required: "This field is required",
                })}
                className="w-full text-sm"
              />
              {errors.DateOfBirth && (
                <span className="text-red-500">
                  {errors.DateOfBirth.message}
                </span>
              )}
            </div>
            <div className="w-full sm:w-1/2">
              <div className="mb-2 block">
                <Label value="Caste Category" />
              </div>
              <Select
                {...register("Caste", { required: "Please select a caste" })}
                defaultValue=""
                className="w-full text-sm"
              >
                <option value="" disabled>
                  Select Caste
                </option>
                <option value="General">General</option>
                <option value="OBC">OBC</option>
                <option value="SC">SC</option>
                <option value="ST">ST</option>
              </Select>
              {errors.Caste && (
                <span className="text-red-500">{errors.Caste.message}</span>
              )}
            </div>
          </div>

          {/* Sub-Caste and Physically Disabled */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:w-1/2">
              <div className="mb-2 block">
                <Label value="Sub-Caste Category" />
              </div>
              <TextInput
                type="text"
                {...register("SubCaste")}
                className="w-full text-sm"
              />
            </div>
            <div className="w-full sm:w-1/2">
              <div className="mb-2 block">
                <Label value="Physically Disabled?" />
              </div>
              <Select
                {...register("Disabled", {
                  required: "Please select an option",
                })}
                defaultValue=""
                className="w-full text-sm"
              >
                <option value="" disabled>
                  Select Disability Status
                </option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </Select>
              {errors.Disabled && (
                <span className="text-red-500">{errors.Disabled.message}</span>
              )}
            </div>
          </div>

          {/* Aadhar Details */}
          <div>
            <div className="mb-2 block">
              <Label value="Aadhar Details" />
            </div>
            <TextInput
              type="text"
              {...register("Aadhar", {
                required: "This field is required",
                validate: (value) =>
                  /^\d{12}$/.test(value) || "Aadhar must be a 12-digit number",
              })}
              className="w-full text-sm"
            />
            {errors.Aadhar && (
              <span className="text-red-500">{errors.Aadhar.message}</span>
            )}
          </div>

          <Button type="submit" disabled={isSubmitting} className="text-sm mt-4 p-2">
            Submit
          </Button>
        </form>
      </div>
    </>
  );
};

export default FormPersonal;
