"use client";
import Navbar from "@/components/Navbar/Navbar";
import Link from "next/link";
import "../auth.css";
import { useState } from "react";
import { toast } from "react-toastify";
interface FormData {
  email: string;
  password: string;
}

export default function Signin() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  // const [message,setMessage] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const checkLogin = async () => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/checklogin`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then((res) => {
      return res.json();
  })
  .then((response) => {
      console.log(response)



      if (response.success) {
          // toast(response.message, {
          //     type: 'success',
          //     position: 'top-right',
          //     autoClose: 2000
          // })

          window.location.href = "/"


      } else {
          // toast(response.message, {
          //     type: 'error',
          //     position: 'top-right',
          //     autoClose: 2000
          // });
      }
  })
  .catch((error) => {
      window.location.href = "/"
  })
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validateErrors: Record<string, string> = {};
    if (!formData.email) {
      validateErrors.email = "Email is required";
    }
    if (!formData.password) {
      validateErrors.password = "Password is required";
    }

    if (Object.keys(validateErrors).length > 0) {
      setErrors(validateErrors);
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then(async (response) => {
        if (response.success) {
          toast(response.message, {
            type: "success",
            position: "top-right",
            autoClose: 2000,
          });
          checkLogin();
        }
        else{
          toast(response.message, {
            type: 'error',
            position: 'top-right',
            autoClose: 2000
        });
        }
        
      })
      .catch((err) => {
        toast(err.message, {
          type: 'error',
          position: 'top-right',
          autoClose: 2000
      });
      });
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
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter Your Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <span className="formerror">{errors.email}</span>
              )}
            </div>
            <div className="forminput_cont">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <span className="formerror">{errors.password}</span>
              )}
            </div>
            <button type="submit" className="main_button">
              Login
            </button>
            <p className="authlink">
              Don't have an account ?
              <Link href="/pages/auth/signup">Register Here</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
