"use client";

import axios from "axios";
import React, { useState } from "react";

export default function ContactForm() {

  const [data, setdata] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const [loading, setloading] = useState(false);
  const [error, seterror] = useState("");
  const [success, setsuccess] = useState("");

  // FIXED FUNCTION
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {

    setdata({
      ...data, // ✅ FIXED HERE
      [e.target.name]: e.target.value
    });

  };

  const submitHandler = async (e: React.FormEvent) => {

    e.preventDefault();

    setloading(true);
    seterror("");
    setsuccess("");

    try {

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/admin/contact/enquiry`,
        data
      );

      setsuccess(res.data.message);

      setdata({
        name: "",
        email: "",
        phone: "",
        message: ""
      });

    }
    catch (error: any) {

      seterror(
        error.response?.data?.message || "Something went wrong"
      );

    }
    finally {

      setloading(false);

    }

  };

  return (

    <section className="max-w-4xl mx-auto text-center">

      {/* headings */}
      <h2 className="text-3xl font-semibold mb-2">
        Get in touch
      </h2>

      <form
        className="space-y-6 max-w-2xl mx-auto"
        onSubmit={submitHandler}
      >

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={data.name}
          onChange={handleChange}
          required
          className="w-full h-12 px-6 rounded-full border"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={data.email}
          onChange={handleChange}
          required
          className="w-full h-12 px-6 rounded-full border"
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={data.phone}
          onChange={handleChange}
          required
          className="w-full h-12 px-6 rounded-full border"
        />

        <textarea
          name="message"
          placeholder="Message"
          value={data.message}
          onChange={handleChange}
          required
          className="w-full px-6 py-4 border rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="px-10 py-3 bg-blue-500 text-white rounded-full"
        >

          {loading ? "Sending..." : "SEND MESSAGE"}

        </button>

        {/* SUCCESS */}
        {success && (
          <p className="text-green-600">{success}</p>
        )}

        {/* ERROR */}
        {error && (
          <p className="text-red-600">{error}</p>
        )}

      </form>

    </section>

  );

}