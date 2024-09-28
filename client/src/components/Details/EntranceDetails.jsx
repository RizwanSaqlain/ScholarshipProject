import React from 'react';
import { useForm } from 'react-hook-form';
import { Label, Select, TextInput, Button, FileInput } from 'flowbite-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EntranceDetails() {
  const { register, handleSubmit, formState: { errors,isSubmitting } } = useForm();



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

  // const onSubmit = (data) => {
  //   console.log(data);
  //   toast.success("Registered successfully!", {
  //     autoClose: 3050,
  //   });
  // };

  return (
    <>
      <ToastContainer />
      <div className="flex justify-center items-center min-h-screen  p-4 mt-12">
        <div className="max-w-lg w-full bg-white rounded-md shadow-lg p-6">
          <h2 className='text-center font-medium text-2xl text-red-600 mb-4'>Entrance Examination Details</h2>
          <p className='text-blue-950 font-serif text-center mb-4'>NEET(UG) / JEE(Mains (or/and) Advance) / CUET / NATA / CLAT</p>

          {/* Form Section */}
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold mb-4">Add Entrance Examination Details</h2>

            {/* Candidate ID */}
            <div className="mb-4">
              <Label htmlFor="candidateId" value="Candidate ID" />
              <TextInput
                type="number"
                id="candidateId"
                {...register("candidateId", { required: "Candidate ID is required" })}
                placeholder="Enter Candidate ID"
              />
              {errors.candidateId && <span className="text-red-600 text-sm">{errors.candidateId.message}</span>}
            </div>

            {/* Exam Name */}
            <div className="mb-4">
              <Label htmlFor="examName" value="Exam Name" />
              <Select id="examName" {...register("examName", { required: "Exam Name is required" })}>
                <option value="">Select an exam</option>
                <option value="NEET">NEET</option>
                <option value="JEE">JEE</option>
                <option value="CUET">CUET</option>
                <option value="NATA">NATA</option>
                <option value="CLAT">CLAT</option>
              </Select>
              {errors.examName && <span className="text-red-600 text-sm">{errors.examName.message}</span>}
            </div>

            {/* Applied? */}
            <div className="mb-4">
              <Label htmlFor="applied" value="Applied?" />
              <Select id="applied" {...register("applied", { required: "This field is required" })}>
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </Select>
              {errors.applied && <span className="text-red-600 text-sm">{errors.applied.message}</span>}
            </div>

            {/* File Upload */}
            <div className="mb-4">
              <Label htmlFor="file" value="Upload Scorecard" />
              <FileInput id="file" />
              <span className="text-gray-500">Size of the file should be less than
                <span className="text-red-600"> 2 MB </span>
              </span>
            </div>

            {/* Submit Button */}
            <Button type="submit" disabled={isSubmitting} className="mt-4 bg-blue-500 text-white hover:bg-blue-600">Submit</Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default EntranceDetails;
