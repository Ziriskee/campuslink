"use client";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { FaPaperPlane as FaPaperPlaneIcon } from "react-icons/fa";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { Box } from "@mui/material";
import { CiCircleCheck } from "react-icons/ci";

// Define strict types for the component Props
interface PostClientProps {
  session: {
    user?: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      id?: string | null;
    };
  } | null;
}

// Define types for Formik form fields
interface FormValues {
  title: string;
  desc: string;
  cat: string;
}

const modalStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "16px", // Smooth curved border to match Tailwind styles
  outline: "none",
};

export default function PostClient({ session }: PostClientProps) {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const iv: FormValues = {
    title: "",
    desc: "",
    cat: "",
  };

  const validationObject = Yup.object({
    title: Yup.string()
      .required("Title is a required field")
      .min(10, "Minimum of 10 characters"),
    desc: Yup.string().required("Description is a required field"),
    cat: Yup.string().required("Category is a required field"),
  });

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        {/* Header Block */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#121358] mb-2">
            Create New Post
          </h1>
          <p className="text-sm text-slate-500">
            Share your latest campus update or resource with the community.
          </p>
        </div>

        <Formik
          initialValues={iv}
          validationSchema={validationObject}
          onSubmit={async (values, { resetForm }) => {
            try {
              console.log("Submitting Post Data:", values);
              await addDoc(collection(db, "news"), {
                author: session?.user?.name || "Anonymous",
                timestamp: new Date().toLocaleDateString(),
                img:
                  session?.user?.image ||
                  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
                userId: session?.user?.id || "",
                title: values.title,
                desc: values.desc,
                cat: values.cat,
              });

              handleOpen();
              resetForm(); // Clears input boxes after successfully posting
            } catch (error) {
              console.error("Firestore database submission error:", error);
            }
          }}
        >
          <Form className="flex flex-col gap-6">
            {/* Title Field */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-[#121358]">
                Title
              </label>
              <Field
                name="title"
                placeholder="Give your post a descriptive title..."
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#36ADA3] focus:ring-1 focus:ring-[#36ADA3] transition-colors"
              />
              <ErrorMessage
                name="title"
                component="p"
                className="text-red-600 text-sm font-medium mt-0.5"
              />
            </div>

            {/* Description Field */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-[#121358]">
                Description
              </label>
              <Field
                as="textarea"
                rows={4}
                name="desc"
                placeholder="What would you like to talk about?"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#36ADA3] focus:ring-1 focus:ring-[#36ADA3] transition-colors resize-none"
              />
              <ErrorMessage
                name="desc"
                component="p"
                className="text-red-600 text-sm font-medium mt-0.5"
              />
            </div>

            {/* Category Selector Field */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-[#121358]">
                Category
              </label>
              <div className="relative">
                <Field
                  as="select"
                  name="cat"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-slate-800 bg-white focus:outline-none focus:border-[#36ADA3] focus:ring-1 focus:ring-[#36ADA3] transition-colors appearance-none cursor-pointer"
                >
                  <option value="" disabled hidden>
                    Select a topic classification
                  </option>
                  <option value="study-resources">Study Resources</option>
                  <option value="campus-news">Campus News</option>
                  <option value="teaching-methods">Teaching Methods</option>
                </Field>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
              <ErrorMessage
                name="cat"
                component="p"
                className="text-red-600 text-sm font-medium mt-0.5"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="mt-2 inline-flex items-center justify-center gap-2 w-full bg-[#121358] text-white px-5 py-3 rounded-lg font-semibold hover:bg-[#1b1d7d] active:scale-[0.99] transition-all cursor-pointer shadow-sm shadow-[#121358]/10"
            >
              <FaPaperPlaneIcon className="text-sm" />
              <span>Make Post</span>
            </button>
          </Form>
        </Formik>
      </div>

      {/* Success Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <div
            id="modal-modal-title"
            className="flex items-center justify-center mb-2"
          >
            <CiCircleCheck className="text-7xl text-green-600" />
          </div>
          <Typography
            id="modal-modal-description"
            className="text-center font-semibold text-slate-700 text-lg"
          >
            Your post has been submitted successfully!
          </Typography>
        </Box>
      </Modal>
    </main>
  );
}
