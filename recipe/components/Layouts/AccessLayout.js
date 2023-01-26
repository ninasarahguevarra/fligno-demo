import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/router";
import isEmpty from "lodash/isEmpty";
import { Token } from "utils/enum";
import styles from "assets/styles/AccessLayout.module.scss";

const AccessLayout = ({ children, type, title }) => {
    const router = useRouter();

    useEffect(() => {
        if (!isEmpty(JSON.parse(localStorage.getItem(Token.Personal)))) {
            router.push("/dashboard");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Head>
                <title>Recipe - {type}</title>
            </Head>
            <div className={styles.wrapper}>
                <div className={styles["sub-wrapper"]}>
                    <div className={styles["form-container"]}>
                        <div className="mb-8">
                            <Image
                                src="/images/logo.png"
                                alt="Logo"
                                width={60}
                                height={60}
                            />
                            <h2>{title}</h2>
                        </div>
                        {children}
                    </div>
                </div>
                <div className={styles.deco}>
                    <Image
                        src="/images/recipe-bg.jpg"
                        alt="chopping board"
                        fill
                    />
                </div>
            </div>
        </>
    );
};

export default AccessLayout;
