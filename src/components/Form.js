import React, { useState } from "react";
import axios from "axios";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({ ...prevData, [name]: reader.result }));
      };
      reader.readAsDataURL(files[0]);
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://script.google.com/macros/s/AKfycbxwoI4hO0hHWg1z6Pr9CabKYp3R4xWwAKxLoL-o1miiHxPjiLEjlGbYJHNI2PqwUMyF/exec",
        formData,
        {
          headers: {
            "Content-Type": "text/plain;charse=utf=8",
          },
        }
      );
      if (response.status === 200) {
        if (response.data.code === 400 || response.data.code === 500) {
          alert("Failed to submit form ", response.data.message);
        } else {
          alert("Form submitted successfully");
        }
      }
    } catch (error) {
      alert("Failed to submit form");
      console.error(error);
    }
  };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post(
  //       "https://script.google.com/macros/s/AKfycbxwoI4hO0hHWg1z6Pr9CabKYp3R4xWwAKxLoL-o1miiHxPjiLEjlGbYJHNI2PqwUMyF/exec",
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "text/plain;charse=utf=8",
  //         },
  //       }
  //     );
  //     console.log(response.data);
  //     if (response.data.result === "success") {
  //       alert("Form submitted successfully");
  //     } else {
  //       alert("Error submitting form");
  //     }
  //   } catch (error) {
  //     alert("Error submitting form");
  //   }
  // };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
      </div>
      <div>
        <label>Message:</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        ></textarea>
      </div>
      <div>
        <label>Image Upload:</label>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Submit
      </button>
    </form>
  );
};

export default Form;
