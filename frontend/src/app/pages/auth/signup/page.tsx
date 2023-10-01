"use client";
import Navbar from "@/components/Navbar/Navbar";
import Link from "next/link";
import "../auth.css";
import { useState } from "react";

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Signup() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  // const [message,setMessage] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("form data", formData);
    setErrors({});
    const validateErrors : Record<string, string> = {};
    if(!formData.email){
      validateErrors.email = "Email is required";
    }
    if(!formData.password){
      validateErrors.password = "Password is required";
    }

    if(formData.password!== formData.confirmPassword){
      validateErrors.confirmPassword = "Passwords do not match";
    }
    if(Object.keys(validateErrors).length > 0){
      setErrors(validateErrors);
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((res)=> {
      res.json();
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      })
    }).catch((err)=>{console.log(err)})

  };
  return (
    <div className="authout">
      <Navbar />
      <div className="authin">
        <div className="left"></div>
        <div className="right">
          <form
            style={{
              display: "flex",
              flexDirection: "column",
            }}
            onSubmit={handleSubmit}
          >
            <div className="forminput_cont">
              <label>Name</label>
              <input
                type="text"
                placeholder="Enter Your Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && (<span className="formerror">{errors.name}</span>)}
            </div>
            <div className="forminput_cont">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter Your Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (<span className="formerror">{errors.email}</span>)}

            </div>
            <div className="forminput_cont">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter Password"
                name="password"
                onChange={handleChange}
                value={formData.password}
              />
              {errors.password && (<span className="formerror">{errors.password}</span>)}

            </div>
            <div className="forminput_cont">
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="Enter Password again"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && (<span className="formerror">{errors.confirmPassword}</span>)}

            </div>
            <button type="submit" className="main_button">
              Register
            </button>
            <p className="authlink">
              Already have an account ? <Link href="/pages/auth/signin">Login</Link>{" "}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
