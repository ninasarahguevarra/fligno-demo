import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { postAuthentication, selectAuth } from "store/slices/authSlice";
import AccessLayout from "components/Layouts/AccessLayout";
import ButtonComponent from "components/ButtonComponent";

const Login = () => {
    const dispatch = useDispatch();
    const {
        register,
        formState: { errors },
        handleSubmit
    } = useForm();
    const { loginResponse } = useSelector(selectAuth);

    const onLogin = (data) => {
        const { email, password } = data;
        const payload = {
            email,
            password
        };
        dispatch(postAuthentication(payload));
    };

    useEffect(() => {
        if (loginResponse.status) {
            window.location.href = "/dashboard";
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loginResponse]);

    return (
        <AccessLayout title="Sign in to your account" type="Sign In">
            <form onSubmit={handleSubmit(onLogin)}>
                <div>
                    <label htmlFor="email">Email address</label>
                    <div className="mt-1">
                        <input
                            id="email"
                            name="email"
                            autoComplete="email"
                            {...register("email", {
                                required: "Email is required"
                            })}
                        />
                        {errors.email && (
                            <p role="alert" className="error-validation">
                                {errors.email?.message}
                            </p>
                        )}
                    </div>
                </div>

                <div className="space-y-1">
                    <label htmlFor="password">Password</label>
                    <div className="mt-1">
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            {...register("password", {
                                required: "Password is required"
                            })}
                        />
                        {errors.password && (
                            <p role="alert" className="error-validation">
                                {errors.password?.message}
                            </p>
                        )}
                    </div>
                </div>

                <ButtonComponent type="solid" label="Sign In" action="submit" className="w-full" />

                <div>
                    <Link href="/register">
                        <ButtonComponent type="outline" label="Create New Account" className="w-full" />
                    </Link>
                </div>
            </form>
        </AccessLayout>
    );
};

export default Login;
