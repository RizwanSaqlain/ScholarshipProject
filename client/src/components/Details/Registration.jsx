import React from "react";
import { useState } from "react";
import { Button, Label, TextInput, Select } from "flowbite-react";
import { useForm } from "react-hook-form";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Registration = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const {
    register,
    handleSubmit,
    watch,
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
        success: "Registered Successfully!",
        error: "Failed to submit!",
      },
      {
        autoClose: 3050,
      }
    );
    //simulating network delay or others
    console.log(data);
    
  };

  React.useEffect(() => {
    if (isSubmitting) {
    }
  }, [isSubmitting]);

  return (
    <>
      <ToastContainer />

      <div className="flex justify-center items-center min-h-screen  m-2 mt-16 rounded-md ">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full">
          <h2 className="text-center text-xl pb-10 text-red-600 font-medium">
            REGISTRATION FORM
          </h2>
          <form
            className="flex flex-col gap-8"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Roll Number and Name */}
            <div className="flex flex-col sm:flex-row gap-8">
              <div className="w-full">
                <Label value="12th Roll Number" className="mb-2 text-sm" />
                <TextInput
                  type="text"
                  placeholder="J&K eg. 15AJTP1234567"
                  className="text-base p-3 w-full"
                  {...register("RollNo", {
                    required: "This field is required",
                  })}
                />
                {errors.RollNo && (
                  <span className="text-red-600">{errors.RollNo.message}</span>
                )}
              </div>

              <div className="w-full">
                <Label value="Candidate's Name" className="mb-2 text-sm" />
                <TextInput
                  type="text"
                  placeholder="Full Name"
                  className="text-base p-3 w-full"
                  {...register("Name", {
                    required: "This field is required",
                  })}
                />
                {errors.Name && (
                  <span className="text-red-600">{errors.Name.message}</span>
                )}
              </div>
            </div>

            {/* Year of Passing and Board Name */}
            <div className="flex flex-col sm:flex-row gap-8">
              <div className="w-full">
                <Label value="Year of Passing" className="mb-2 text-sm" />
                <TextInput
                  type="text"
                  placeholder="Year of Passing"
                  className="text-base p-3 w-full"
                  {...register("YearOfPassing", {
                    required: "This field is required",
                  })}
                />
                {errors.YearOfPassing && (
                  <span className="text-red-600">
                    {errors.YearOfPassing.message}
                  </span>
                )}
              </div>

              <div className="w-full">
                <Label value="Board Name" className="mb-2 text-sm" />
                <TextInput
                  type="text"
                  placeholder="Board Name"
                  className="text-base p-3 w-full"
                  {...register("BoardName", {
                    required: "This field is required",
                  })}
                />
                {errors.BoardName && (
                  <span className="text-red-600">
                    {errors.BoardName.message}
                  </span>
                )}
              </div>
            </div>

            {/* Father's Name and Mother's Name */}
            <div className="flex flex-col sm:flex-row gap-8">
              <div className="w-full">
                <Label value="Father's Name" className="mb-2 text-sm" />
                <TextInput
                  type="text"
                  placeholder="Father's Name"
                  className="text-base p-3 w-full"
                  {...register("FatherName", {
                    required: "This field is required",
                  })}
                />
                {errors.FatherName && (
                  <span className="text-red-600">
                    {errors.FatherName.message}
                  </span>
                )}
              </div>

              <div className="w-full">
                <Label value="Mother's Name" className="mb-2 text-sm" />
                <TextInput
                  type="text"
                  placeholder="Mother's Name"
                  className="text-base p-3 w-full"
                  {...register("MotherName", {
                    required: "This field is required",
                  })}
                />
                {errors.MotherName && (
                  <span className="text-red-600">
                    {errors.MotherName.message}
                  </span>
                )}
              </div>
            </div>

            {/* Family Income and Domicile */}
            <div className="flex flex-col sm:flex-row gap-8">
              <div className="w-full">
                <Label value="Family Income" className="mb-2 text-sm" />
                <Select
                  {...register("Income", {
                    required: "This field is required",
                  })}
                >
                  <option>Less than 100000</option>
                  <option>100000-200000</option>
                  <option>200000-500000</option>
                  <option>500000-800000</option>
                </Select>
              </div>

              <div className="w-full">
                <Label
                  htmlFor="Domicile"
                  value="Is Domicile of J&K or Ladakh?"
                  className="mb-2 text-sm"
                />
                <Select
                  id="Domicile"
                  {...register("Domicile", {
                    required: "This field is required",
                  })}
                >
                  <option>Yes</option>
                  <option>No</option>
                </Select>
              </div>
            </div>

            {/* CUET Registration  */}
            <div className="flex flex-col sm:flex-row gap-8">
              <div className="w-full">
                <Label value="Is CUET Registered?" className="mb-2 text-sm" />
                <Select
                  {...register("CUETRegistered", {
                    required: "This field is required",
                  })}
                >
                  <option>Yes</option>
                  <option selected>No</option>
                </Select>

                {errors.CUETRegistered && (
                  <span className="text-red-600">
                    {errors.CUETRegistered.message}
                  </span>
                )}
              </div>

              <div className="w-full">
                <Label
                  value="CUET Registration Number"
                  className="mb-2 text-sm"
                />
                <TextInput
                  type="text"
                  placeholder="CUET Registration Number"
                  className="text-base p-3 w-full"
                  {...register("Reg_CUET", {
                    validate: (value) =>
                      watch("CUETRegistered") === "Yes"
                        ? value.trim() !== "" ||
                          "CUET Registration Number is required if registered for CUET"
                        : true,
                  })}
                  disabled={watch("CUETRegistered") === "No"}
                />
                {errors.Reg_CUET && (
                  <span className="text-red-600">
                    {errors.Reg_CUET.message}
                  </span>
                )}
              </div>
            </div>

            {/* NEET Registration  */}
            <div className="flex flex-col sm:flex-row gap-8">
              <div className="w-full">
                <Label value="Is NEET Registered?" className="mb-2 text-sm" />
                <Select
                  {...register("NEETRegistered", {
                    required: "This field is required",
                  })}
                >
                  <option>Yes</option>
                  <option selected>No</option>
                </Select>

                {errors.NEETRegistered && (
                  <span className="text-red-600">
                    {errors.NEETRegistered.message}
                  </span>
                )}
              </div>
              <div className="w-full">
                <Label
                  value="NEET Registration Number"
                  className="mb-2 text-sm"
                />
                <TextInput
                  type="text"
                  placeholder="NEET Registration Number"
                  className="text-base p-3 w-full"
                  // {...register("Reg_NEET")}
                  {...register("Reg_NEET", {
                    validate: (value) =>
                      watch("NEETRegistered") === "Yes"
                        ? value.trim() !== "" ||
                          "NEET Registration Number is required if registered for NEET"
                        : true,
                  })}
                  disabled={watch("NEETRegistered") === "No"}
                />
                {errors.Reg_NEET && (
                  <span className="text-red-600">
                    {errors.Reg_NEET.message}
                  </span>
                )}
              </div>
            </div>

            {/* JEE Registration */}
            <div className="flex flex-col sm:flex-row gap-8">
              <div value=" Is JEE Registered?" className="w-full">
                <Label className="mb-2 text-sm" />
                <Select
                  {...register("JEERegistered", {
                    required: "This field is required",
                  })}
                >
                  <option>Yes</option>
                  <option selected>No</option>
                </Select>
                {errors.JEERegistered && (
                  <span className="text-red-600">
                    {errors.JEERegistered.message}
                  </span>
                )}
              </div>
              <div className="w-full">
                <Label
                  value="JEE Registration Number"
                  className="mb-2 text-sm"
                />
                <TextInput
                  type="text"
                  placeholder="JEE Registration Number"
                  className="text-base p-3 w-full"
                  {...register("Reg_JEE", {
                    validate: (value) =>
                      watch("JEERegistered") === "Yes"
                        ? value.trim() !== "" ||
                          "JEE Registration Number is required if registered for JEE"
                        : true,
                  })}
                  disabled={watch("JEERegistered") === "No"}
                />
                {errors.Reg_JEE && (
                  <span className="text-red-600">{errors.Reg_JEE.message}</span>
                )}
              </div>
            </div>

            {/* Aadhar Number and Confirm Aadhar Number */}
            <div className="flex flex-col sm:flex-row gap-8">
              <div className="w-full">
                <Label value="Aadhar Number" className="mb-2 text-sm" />
                <TextInput
                  type="text"
                  placeholder="Aadhar Number"
                  className="text-base p-3 w-full"
                  {...register("AadharNo", {
                    required: "This field is required",
                    pattern: {
                      value: /^[0-9]{12}$/,
                      message: "Aadhar number must be 12 digits",
                    },
                  })}
                />
                {errors.AadharNo && (
                  <span className="text-red-600">
                    {errors.AadharNo.message}
                  </span>
                )}
              </div>
              <div className="w-full">
                <Label value="Confirm Aadhar Number" className="mb-2 text-sm" />
                <TextInput
                  type="text"
                  placeholder="Confirm Aadhar Number"
                  className="text-base p-3 w-full"
                  {...register("ConfirmAadharNo", {
                    required: "This field is required",
                    validate: (value) =>
                      value === watch("AadharNo") ||
                      "Aadhar numbers do not match",
                  })}
                />
                {errors.ConfirmAadharNo && (
                  <span className="text-red-600">
                    {errors.ConfirmAadharNo.message}
                  </span>
                )}
              </div>
            </div>

            {/* Mobile Number and Email */}
            <div className="flex flex-col sm:flex-row gap-8">
              <div className="w-full">
                <Label value="Mobile Number" className="mb-2 text-sm" />
                <TextInput
                  type="number"
                  placeholder="Mobile Number"
                  className="text-base p-3 w-full"
                  {...register("MobileNo", {
                    required: "This field is required",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Mobile number must be 10 digits",
                    },
                  })}
                />
                {errors.MobileNo && (
                  <span className="text-red-600">
                    {errors.MobileNo.message}
                  </span>
                )}
              </div>
              <div className="w-full">
                <Label value="Email" className="mb-2 text-sm" />
                <TextInput
                  type="email"
                  placeholder=".....@gmail.com"
                  className="text-base p-3 w-full"
                  {...register("EmailId", {
                    required: "This field is required",
                    pattern: {
                      value: /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.EmailId && (
                  <span className="text-red-600">{errors.EmailId.message}</span>
                )}
              </div>
            </div>

            {/* Confirm Email */}
            <div className="w-full">
              <Label value="Confirm Email" className="mb-2 text-sm" />
              <TextInput
                type="email"
                placeholder="Confirm Email"
                className="text-base p-3 w-full"
                {...register("ConfirmEmailId", {
                  required: "This field is required",
                  validate: (value) =>
                    value === watch("EmailId") ||
                    "Email addresses do not match",
                })}
              />
              {errors.ConfirmEmailId && (
                <span className="text-red-600">
                  {errors.ConfirmEmailId.message}
                </span>
              )}
            </div>

            {/* Password  */}
            <div className="flex flex-col sm:flex-row gap-8">
              <div value="Password" className="w-full relative">
                <Label
                  htmlFor="Password"
                  value="Password"
                  className="mb-2 text-sm"
                />
                <div className="relative">
                  <TextInput
                    id="Password"
                    type={showPassword ? "text" : "password"} ///showing password
                    placeholder="Password"
                    shadow
                    className="text-base p-3 w-full pr-10" // Add padding to the right for the icon
                    {...register(
                      "Password",

                      {
                        required: "This field is required",

                        pattern: {
                          value:
                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{4,8}$/,
                          message:
                            "Password must contain one lowercase letter, one uppercase letter, one number, and one special character",
                        },

                        minLength: {
                          value: 4,
                          message:
                            "Password must be at least 4 characters long",
                        },
                        maxLength: {
                          value: 8,
                          message:
                            "Password must be no more than 8 characters long",
                        },
                      }
                    )}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                  >
                    {showPassword ? (
                      <HiEye className="text-blue-600" size={20} />
                    ) : (
                      <HiEyeOff className="text-blue-600" size={20} />
                    )}
                  </button>
                </div>
                {errors.Password && (
                  <span className="text-red-600">
                    {errors.Password.message}
                  </span>
                )}

                <p className="text-gray-600 text-sm">
                  Password must contain one lowercase letter, one uppercase
                  letter, one number, and one special character
                </p>
              </div>

              <div className="w-full relative">
                <Label
                  htmlFor="ConfirmPassword"
                  value="Confirm Password"
                  className="mb-2 text-sm"
                />
                <div className="relative">
                  <TextInput
                    id="ConfirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    shadow
                    className="text-base p-3 w-full pr-10" // Add padding to the right for the icon
                    {...register("ConfirmPassword", {
                      required: "This field is required",
                      validate: (value) =>
                        value === watch("Password") || "Passwords do not match",

                      pattern: {
                        value:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{4,8}$/,
                        message:
                          "Password must contain one lowercase letter, one uppercase letter, one number, and one special character",
                      },

                      minLength: {
                        value: 4,
                        message: "Password must be at least 4 characters long",
                      },
                      maxLength: {
                        value: 8,
                        message:
                          "Password must be no more than 8 characters long",
                      },
                    })}
                  />
                  <button
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                  >
                    {showConfirmPassword ? (
                      <HiEye className="text-blue-600" size={20} />
                    ) : (
                      <HiEyeOff className="text-blue-600" size={20} />
                    )}
                  </button>
                </div>
                {errors.ConfirmPassword && (
                  <span className="text-red-600">
                    {errors.ConfirmPassword.message}
                  </span>
                )}
              </div>
            </div>

            {/* Submit Button */}

            <Button
              type="submit"
              disabled={isSubmitting}
              className="text-sm p-3"
            >
              Register
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Registration;
