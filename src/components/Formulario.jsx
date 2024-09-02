import React, { useState } from "react";
import { useForm } from "react-hook-form";
import DOMPurify from "dompurify";
import warningIcon from "../../public/images/icon-error.svg"; 
import "../styles/Formulario.css";

function Formulario() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [successMessage, setSuccessMessage] = useState("");

  const onSubmit = (data) => {
    const sanitizedData = {
      firstName: DOMPurify.sanitize(data.firstName),
      lastName: DOMPurify.sanitize(data.lastName),
      email: DOMPurify.sanitize(data.email),
      password: DOMPurify.sanitize(data.password),
    };

    console.log("Datos sanitizados enviados:", sanitizedData);

    setSuccessMessage("Form submitted successfully!");

    setTimeout(() => {
      setSuccessMessage("");
      reset();
    }, 5000);
  };

  return (
    <div className="container">
      <div className="header">

      <h1>Learn to code by watching others</h1>
      <p className="paragraph">
        See how experienced developers solve problems in real-time. Watching
        scripted tutorials is great, but understanding how developers think is
        invaluable.
      </p>
      </div>
      
      

      <div className="desktop-container">

      <div className="price-info">
        <strong>Try it free 7 days</strong> then $20/mo. thereafter
      </div>
      

      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="First Name"
              {...register("firstName", {
                required: "First Name is required",
                maxLength: {
                  value: 30,
                  message: "First Name cannot exceed 30 characters",
                },
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message: "First Name should only contain letters",
                },
              })}
              className={errors.firstName ? "input-error" : ""}
            />
            {errors.firstName && (
              <img
                src={warningIcon}
                alt="Warning"
                className="warning-icon"
              />
            )}
          </div>
          {errors.firstName && (
            <span className="error-message">{errors.firstName.message}</span>
          )}
        </div>
        <div className="form-group">
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Last Name"
              {...register("lastName", {
                required: "Last Name is required",
                maxLength: {
                  value: 30,
                  message: "Last Name cannot exceed 30 characters",
                },
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message: "Last Name should only contain letters",
                },
              })}
              className={errors.lastName ? "input-error" : ""}
            />
            {errors.lastName && (
              <img
                src={warningIcon}
                alt="Warning"
                className="warning-icon"
              />
            )}
          </div>
          {errors.lastName && (
            <span className="error-message">{errors.lastName.message}</span>
          )}
        </div>
        <div className="form-group">
          <div className="input-wrapper">
            <input
              type="email"
              placeholder="Email Address"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value:
                    /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                  message: "Invalid email address",
                },
              })}
              className={errors.email ? "input-error" : ""}
            />
            {errors.email && (
              <img
                src={warningIcon}
                alt="Warning"
                className="warning-icon"
              />
            )}
          </div>
          {errors.email && (
            <span className="error-message">{errors.email.message}</span>
          )}
        </div>
        <div className="form-group">
          <div className="input-wrapper">
            <input
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    "Password must contain at least one letter and one number",
                },
              })}
              className={errors.password ? "input-error" : ""}
            />
            {errors.password && (
              <img
                src={warningIcon}
                alt="Warning"
                className="warning-icon"
              />
            )}
          </div>
          {errors.password && (
            <span className="error-message">{errors.password.message}</span>
          )}
        {successMessage && <span className="success-message">{successMessage}</span>}
        </div>
        <button type="submit" className="btn">
          Claim your free trial
        </button>
        <p className="terms">
          By clicking the button, you are agreeing to our{" "}
          <a href="#">Terms and Services</a>
        </p>
      </form>
      </div>
    </div>
  );
}

export default Formulario;
