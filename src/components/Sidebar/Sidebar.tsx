import { Fragment, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import sidebarData from "./sidebar-data";
import { useTranslation } from "next-i18next";

const activeLink = "text-sky-500 hover:text-sky-600";
const inactiveLink = "text-slate-700 hover:text-slate-500";
const activeLinkIcon = "opacity-75";
const inactiveLinkIcon = "text-slate-300";

export default function Sidebar() {
  const [collapseShow] = useState("hidden");
  const { pathname } = useRouter();
  const { t } = useTranslation();

  return (
    <>
      <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Brand */}
          <Link href="/">
            <a
              href="#pablo"
              className="md:block text-left md:pb-2 text-slate-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
            >
              {t("brand")}
            </a>
          </Link>
          {/* Collapse */}
          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            {sidebarData.map((data) => (
              <Fragment key={data.category}>
                {/* Divider */}
                <hr className="my-4 md:min-w-full" />

                {/* Heading */}
                <h6 className="md:min-w-full text-slate-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
                  {t(data.category)}
                </h6>

                {/* Navigation */}
                <ul className="md:flex-col md:min-w-full flex flex-col list-none">
                  {data.elements.map((element) => {
                    const isCurrentRoute =
                      pathname.indexOf(element.route) !== -1;

                    return (
                      <li className="items-center" key={element.label}>
                        <Link href={element.route}>
                          <a
                            className={`text-xs uppercase py-3 font-bold block ${
                              isCurrentRoute ? activeLink : inactiveLink
                            }`}
                          >
                            <i
                              className={`${element.icon} mr-2 text-sm ${
                                isCurrentRoute
                                  ? activeLinkIcon
                                  : inactiveLinkIcon
                              }`}
                            ></i>
                            {t(element.label)}
                          </a>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </Fragment>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}
