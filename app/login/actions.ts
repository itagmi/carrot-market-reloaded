"use server";

export const handleForm = async (prevState: any, formData: FormData) => {
  console.log(prevState);
  await new Promise((resolve) => setTimeout(resolve, 5000));
  console.log("hey logged in!");
  return {
    error: ["wrong password", "password too short"],
  };
};
