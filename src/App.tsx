import { Authenticated, GitHubBanner, Refine, WelcomePage } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";




import "@refinedev/antd/dist/reset.css";


import {dataProvider,liveProvider,authProvider} from "./Providers";
import {Home,Login,Register,ForgotPassword} from './pages'


import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { App as AntdApp } from "antd";

import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

import {
  BlogPostCreate,
  BlogPostEdit,
  BlogPostList,
  BlogPostShow,
} from "./pages/blog-posts";
import {
  CategoryCreate,
  CategoryEdit,
  CategoryList,
  CategoryShow,
} from "./pages/categories";

import Layout from "./components/layout"

import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import { resources } from "./config/resources";
// import { liveProvider } from "@refinedev/nestjs-query";
//npm install --save-dev @graphql-codegen/typescript @graphql-codegen/typescript-operations @graphql-codegen/import-types-preset prettier vite-tsconfig-path




function App() {
  return (
    <BrowserRouter>

      <RefineKbarProvider>
          <AntdApp>
            <DevtoolsProvider>
              <Refine
                dataProvider={dataProvider}
                liveProvider={liveProvider}
               //notificationProvider={useNotificationProvider}
                routerProvider={routerBindings}
                authProvider={authProvider}
                 resources={resources}
                //   {
                //     name: "blog_posts",
                //     list: "/blog-posts",
                //     create: "/blog-posts/create",
                //     edit: "/blog-posts/edit/:id",
                //     show: "/blog-posts/show/:id",
                //     meta: {
                //       canDelete: true,
                //     },
                //   },
                //   {
                //     name: "categories",
                //     list: "/categories",
                //     create: "/categories/create",
                //     edit: "/categories/edit/:id",
                //     show: "/categories/show/:id",
                //     meta: {
                //       canDelete: true,
                //     },
                //   },
                // ]}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: "I86G8V-nha6cq-GIj2dw",
                  liveMode: "auto",
                }}
              >
              
              <Routes>
         
               
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route element={
                    <Authenticated
                      key="authenticated-layout"
                      fallback={<CatchAllNavigate to="/forgot-password" />}
                    >
                    <Layout>
                      <Outlet />
                    </Layout>
                  </Authenticated>
                } >
                   <Route index element={<Home />} />
                  </Route>
              </Routes>

                
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              <DevtoolsPanel />
            </DevtoolsProvider>
          </AntdApp>
          </RefineKbarProvider>
       
    </BrowserRouter>
  );
}

export default App;
