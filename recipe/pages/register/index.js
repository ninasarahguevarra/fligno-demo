import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import { useForm } from "react-hook-form";
import { postRegistration, selectAuth } from "store/slices/authSlice";
import AccessLayout from "components/Layouts/AccessLayout";
import ButtonComponent from "components/ButtonComponent";
import styles from "assets/styles/AccessLayout.module.scss";

const Register = () => {
    const dispatch = useDispatch();
    const { registrationResponse } = useSelector(selectAuth);
    const {
        register,
        watch,
        formState: { errors },
        handleSubmit
    } = useForm();
    const [passwordType, setPasswordType] = useState("password");
    const [cPasswordType, setCPasswordType] = useState("password");

    const togglePasswordType = (type, value) => {
        if (value === "text") {
            switch (type) {
                case "password":
                    setPasswordType("password");
                    break;
                default:
                    setCPasswordType("password");
                    break;
            }
        } else {
            switch (type) {
                case "password":
                    setPasswordType("text");
                    break;
                default:
                    setCPasswordType("text");
                    break;
            }
        }
    };

    const onRegister = (data) => {
        const { name, email, password } = data;
        const payload = {
            name,
            email,
            password
        };
        dispatch(postRegistration(payload));
    };

    useEffect(() => {
        if (registrationResponse.status) {
            window.location.href = "/dashboard";
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [registrationResponse]);

    return (
        <AccessLayout title="Create your account" type="Register">
            <form className="space-y-3" onSubmit={handleSubmit(onRegister)}>
                <div>
                    <label htmlFor="name">Name</label>
                    <div className="mt-1">
                        <input
                            id="name"
                            name="name"
                            type="text"
                            autoComplete="name"
                            {...register("name", {
                                required: "Name is required"
                            })}
                        />
                        {errors.name && (
                            <p role="alert" className="error-validation">
                                {errors.name?.message}
                            </p>
                        )}
                    </div>
                </div>

                <div>
                    <label htmlFor="email">Email address</label>
                    <div className="mt-1">
                        {/* eslint-disable */}
                        <input
                            id="email"
                            name="email"
                            autoComplete="off"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                    message: "Invalid email address"
                                }
                            })}
                        />
                        {errors.email && (
                            <p role="alert" className="error-validation">
                                {errors.email?.message}
                            </p>
                        )}
                    </div>
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                        <div className={styles["password-input"]}>
                            <input
                                type={passwordType}
                                name="password"
                                id="password"
                                {...register("password", {
                                    required: "Password is required"
                                })}
                            />
                        </div>
                        <ButtonComponent
                            action="button"
                            type="prepend-icon"
                            onClick={() => togglePasswordType("password", passwordType)}
                        >
                            { passwordType === "password"
                                ? <EyeSlashIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                : <EyeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            }
                        </ButtonComponent>
                    </div>
                    {errors.password && (
                        <p role="alert" className="error-validation">
                            {errors.password?.message}
                        </p>
                    )}
                </div>

                <div>
                    <label htmlFor="password">Confirm Password</label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                        <div className={styles["password-input"]}>
                            <input
                                type={cPasswordType}
                                name="confirm_password"
                                id="confirm_password"
                                {...register("confirm_password", {
                                    required: "Confirm password is required",
                                    validate: (val) => {
                                        if (watch("password") !== val) {
                                            return "Your passwords do no match";
                                        }
                                    }
                                })}
                            />
                        </div>
                        <ButtonComponent
                            type="prepend-icon"
                            action="button"
                            onClick={() => togglePasswordType("confirm_password", cPasswordType)}
                        >
                            { cPasswordType === "password"
                                ? <EyeSlashIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                : <EyeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            }
                        </ButtonComponent>
                    </div>
                    {errors.confirm_password && (
                        <p role="alert" className="error-validation">
                            {errors.confirm_password?.message}
                        </p>
                    )}
                </div>

                <ButtonComponent type="solid" label="Sign Up" className="w-full" action="submit" />

                <div>
                    <Link href="/">
                        <ButtonComponent action="button" type="outline" label="Back to Sign In" className="w-full" />
                    </Link>
                </div>
            </form>
        </AccessLayout>
    );
};

export default Register;
