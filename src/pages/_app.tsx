import React from "react";
import ReactDOM from "react-dom";
import App from "next/app";
import Head from "next/head";
import Router, { useRouter } from "next/router";

import { Toaster } from "react-hot-toast";

import PageChange from "@/components/PageChange/PageChange";
import Dashboard, { DashboardProps } from "@/layouts/Dashboard";
import AuthContext from "@/contexts/AuthContext";
import { appWithTranslation } from "next-i18next";

import "@/setups/dayjs";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "@/styles/globals.css";
import "@/styles/tailwind.css";

Router.events.on("routeChangeStart", (url) => {
  console.log(`Loading: ${url}`);
  document.body.classList.add("body-page-transition");
  ReactDOM.render(
    <PageChange path={url} />,
    document.getElementById("page-transition")
  );
});
Router.events.on("routeChangeComplete", () => {
  ReactDOM.unmountComponentAtNode(
    document.getElementById("page-transition") as HTMLElement
  );
  document.body.classList.remove("body-page-transition");
});
Router.events.on("routeChangeError", () => {
  ReactDOM.unmountComponentAtNode(
    document.getElementById("page-transition") as HTMLElement
  );
  document.body.classList.remove("body-page-transition");
});

class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }: any) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    // ToDo: REMOVE THIS DUMMY USER AFTER AUTH SETUP
    const dummyUser = {
      authenticated: true,
      user: {
        id: "098w32jrfsp9a8j",
        name: "Fabian",
        lastLogin: new Date().toISOString(),
      },
    };

    const { Component, pageProps }: any = this.props;

    const Layout =
      Component.layout ||
      (({ children }: DashboardProps) => <Dashboard>{children}</Dashboard>);

    return (
      <>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
        </Head>
        <Toaster position="bottom-left" />
        <AuthContext.Provider value={dummyUser}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AuthContext.Provider>
      </>
    );
  }
}

export default appWithTranslation(MyApp);
