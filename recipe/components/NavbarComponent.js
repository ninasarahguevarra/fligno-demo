import { useState, Fragment, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { Menu, Popover, Transition } from "@headlessui/react";
import { MagnifyingGlassIcon, UserIcon } from "@heroicons/react/20/solid";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Token } from "utils/enum";
import { classNames } from "utils/helpers";
import { getRecipeList } from "store/slices/recipeListSlice";
import styles from "assets/styles/Navbar.module.scss";
import isEmpty from "lodash/isEmpty";

const NavbarComponent = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { query } = router;
    const [keyword, setKeyword] = useState("");
    const userNavigation = [{ name: "Sign out", href: "#" }];
    const [userInfo, setUserInfo] = useState({});
    const payload = {
        type: "any",
        diet: "balanced"
    };

    useEffect(() => {
        if (!isEmpty(JSON.parse(localStorage.getItem(Token.Personal)))) {
            setUserInfo(JSON.parse(localStorage.getItem(Token.Personal)));
        }
    }, []);

    const onClickMenuItem = (item) => {
        switch (item) {
            case "Sign out":
                localStorage.removeItem(Token.Personal);
                location.reload();
                break;
            // add case for additional menu
            default:
                break;
        }
    };

    const searchRecipe = (e) => {
        e.preventDefault();
        const items = {
            ...payload,
            q: keyword
        };
        dispatch(getRecipeList(items));
    };

    return (
        <Popover
            as="header"
            className={({ open }) => classNames(open ? styles.open : "", styles.wrapper)}
        >
            {({ open }) => (
                <>
                    <div className={classNames(open ? "pb-4" : "", styles["sub-wrapper"])}>
                        <div className={styles["grid-container"]}>
                            <div className={styles["logo-wrapper"]}>
                                <div className={styles["logo-subwrapper"]}>
                                    <Link href="/dashboard">
                                        <Image
                                            src="/images/logo.png"
                                            alt="Logo"
                                            width={36}
                                            height={36}
                                        />
                                    </Link>
                                </div>
                            </div>

                            { !query.recipeId &&
                                <div className={styles["search-wrapper"]}>
                                    <div className={styles["search-subwrapper"]}>
                                        <div className="w-full">
                                            <label htmlFor="search" className="sr-only">Search</label>
                                            <form onSubmit={searchRecipe}>
                                                <div className="relative">
                                                    <div className={styles["search-icon"]}>
                                                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                    </div>
                                                    <input
                                                        id="search"
                                                        name="search"
                                                        placeholder="Search"
                                                        type="search"
                                                        onChange={(e) => setKeyword(e.target.value)}
                                                    />
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            }

                            {/* FOR MOBILE MENU BUTTON */}
                            <div className={styles["mobile-popover-buttons"]}>
                                <Popover.Button>
                                    <span className="sr-only">Open menu</span>
                                    {open
                                        ? <XMarkIcon className="block h-6 w-6 text-primary" />
                                        : <Bars3Icon className="block h-6 w-6 text-primary" />
                                    }
                                </Popover.Button>
                            </div>

                            {/* FOR DESKTOP MENU BUTTON */}
                            <div className={styles["desktop-popover-wrapper"]}>
                                <Menu as="div" className={styles["desktop-menu"]}>
                                    <div>
                                        <Menu.Button>
                                            <span className="sr-only">Open user menu</span>
                                            <UserIcon className="h-8 w-8 text-gray-400" aria-hidden="true" />
                                        </Menu.Button>
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        enter={styles["transition-enter"]}
                                        enterFrom={styles["transition-disapper"]}
                                        enterTo={styles["transition-appear"]}
                                        leave={styles["transition-leave"]}
                                        leaveFrom={styles["transition-appear"]}
                                        leaveTo={styles["transition-disapper"]}
                                    >
                                        <Menu.Items className={styles["desktop-menu-items"]}>
                                            {userNavigation.map((item) => (
                                                <Menu.Item key={item.name} onClick={() => onClickMenuItem(item.name)}>
                                                    {({ active }) => (
                                                        <span
                                                            className={classNames(active ? "bg-rose-50" : "", styles["desktop-item-list"])}
                                                        >
                                                            {item.name}
                                                        </span>
                                                    )}
                                                </Menu.Item>
                                            ))}
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                        </div>
                    </div>

                    <Popover.Panel as="nav" className="lg:hidden">
                        <div className={styles["mobile-popover-wrapper"]}>
                            <div className={styles["user-info-wrapper"]}>
                                <div className="flex-shrink-0">
                                    <UserIcon className="h-8 w-8 text-gray-400" aria-hidden="true" />
                                </div>
                                {!isEmpty(userInfo) &&
                                    <div className="ml-3">
                                        <div className={styles.name}>{userInfo.name}</div>
                                        <div className={styles.email}>{userInfo.email}</div>
                                    </div>
                                }
                            </div>
                            <div className={styles["mobile-menu"]}>
                                {userNavigation.map((item) => (
                                    <span
                                        key={item.name}
                                        className={styles["mobile-item-list"]}
                                        onClick={() => onClickMenuItem(item.name)}
                                    >
                                        {item.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </Popover.Panel>
                </>
            )}
        </Popover>
    );
};

export default NavbarComponent;
