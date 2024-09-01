
import React, { useState, useRef, useEffect } from "react";
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
    clearErrors,
  } = useForm();
  const [successMessage, setSuccessMessage] = useState("");

  // Crear referencias para cada input
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

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

  // Manejar el desenfoque de los inputs si hay errores
  useEffect(() => {
    if (errors.firstName) {
      firstNameRef.current.blur();
    }
    if (errors.lastName) {
      lastNameRef.current.blur();
    }
    if (errors.email) {
      emailRef.current.blur();
    }
    if (errors.password) {
      passwordRef.current.blur();
    }
  }, [errors]);

  const clearError = (field) => () => clearErrors(field);

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

      <div className="formAndPrice">
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
                ref={firstNameRef}
                onFocus={clearError("firstName")} // Limpiar error al hacer foco
              />
              {errors.firstName && (
                <img src={warningIcon} alt="Warning" className="warning-icon" />
              )}
            </div>
            {errors.firstName && (
              <div className="error">
                <span className="error-message">
                  {errors.firstName.message}
                </span>
              </div>
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
                ref={lastNameRef}
                onFocus={clearError("lastName")} // Limpiar error al hacer foco
              />
              {errors.lastName && (
                <img src={warningIcon} alt="Warning" className="warning-icon" />
              )}
            </div>
            {errors.lastName && (
              <div className="error">
                <span className="error-message">{errors.lastName.message}</span>
              </div>
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
                    value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                    message: "Invalid email address",
                  },
                })}
                className={errors.email ? "input-error" : ""}
                ref={emailRef}
                onFocus={clearError("email")} // Limpiar error al hacer foco
              />
              {errors.email && (
                <img src={warningIcon} alt="Warning" className="warning-icon" />
              )}
            </div>
            {errors.email && (
              <div className="error">
                <span className="error-message">{errors.email.message}</span>
              </div>
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
                ref={passwordRef}
                onFocus={clearError("password")} // Limpiar error al hacer foco
              />
              {errors.password && (
                <img src={warningIcon} alt="Warning" className="warning-icon" />
              )}
            </div>
            {errors.password && (
              <div className="error">
                <span className="error-message">{errors.password.message}</span>
              </div>
            )}
          </div>
          {successMessage && (
            <p className="success-message">{successMessage}</p>
          )}
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



