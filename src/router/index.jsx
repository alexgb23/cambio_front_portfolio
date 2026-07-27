import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router";
import MainLayout from "../layout/MainLayout";

function lazyWithPreload(importer) {
  const Component = lazy(importer);
  Component.preload = importer;
  return Component;
}

export const Home = lazyWithPreload(() => import("../pages/home/Home"));
export const About = lazyWithPreload(() => import("../pages/about/About"));
export const Projects = lazyWithPreload(
  () => import("../pages/projects/Projects"),
);
export const Certifications = lazyWithPreload(
  () => import("../pages/certificaciones/Certificaciones"),
);
export const ProjectDetail = lazyWithPreload(
  () => import("../pages/projects/ProjectDetail"),
);
export const Contact = lazyWithPreload(
  () => import("../pages/contact/Contact"),
);
export const Laboratory = lazyWithPreload(
  () => import("../pages/laboratory/Laboratory"),
);

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route
          index
          element={
            <Suspense fallback={null}>
              <Home />
            </Suspense>
          }
        />

        <Route
          path="sobre-mi"
          element={
            <Suspense fallback={null}>
              <About />
            </Suspense>
          }
        />

        <Route
          path="certificaciones"
          element={
            <Suspense fallback={null}>
              <Certifications />
            </Suspense>
          }
        />

        <Route
          path="proyectos"
          element={
            <Suspense fallback={null}>
              <Projects />
            </Suspense>
          }
        />

        <Route
          path="proyectos/:slug"
          element={
            <Suspense fallback={null}>
              <ProjectDetail />
            </Suspense>
          }
        />

        <Route
          path="contacto"
          element={
            <Suspense fallback={null}>
              <Contact />
            </Suspense>
          }
        />

        <Route
          path="laboratorio"
          element={
            <Suspense fallback={null}>
              <Laboratory />
            </Suspense>
          }
        />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
