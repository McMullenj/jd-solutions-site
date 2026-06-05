import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';

const JdSolutionsApp = lazy(() =>
  import('@jd/JdSolutionsApp').then((module) => ({ default: module.JdSolutionsApp })),
);

const SplitFrameApp = lazy(() =>
  import('@split-frame/SplitFrameApp').then((module) => ({ default: module.SplitFrameApp })),
);

function RouteDocumentTitle() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.startsWith('/split-frame')) {
      document.title = 'Split Frame — Strava stats on your desk';
      document
        .querySelector('meta[name="description"]')
        ?.setAttribute(
          'content',
          'A minimal e-paper display that keeps your Strava training stats front and centre.',
        );
      return;
    }

    document.title = 'JD Solutions';
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        'content',
        'JD Solutions is a software development studio for web, apps, systems, and automation.',
      );
  }, [pathname]);

  return null;
}

function PageFallback() {
  return null;
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <RouteDocumentTitle />
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route path="/" element={<JdSolutionsApp />} />
          <Route path="/split-frame" element={<SplitFrameApp />} />
          <Route path="/split-frame/*" element={<SplitFrameApp />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
