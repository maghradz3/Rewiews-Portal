import React from "react";
import { Route, Routes } from "react-router";
import {
  HomePage,
  RegisterPage,
  LoginPage,
  ReviewPage,
  AuthorReviewsPage,
} from "./pages";
import { useUser } from "./hooks";

export const RouteComponent = () => {
  const { userInfo } = useUser();
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      {userInfo && <Route path="/reviewUpload" element={<ReviewPage />} />}
      {userInfo && <Route path="/:title/new" element={<ReviewPage />} />}
      {userInfo && (
        <Route path="/authorReviews" element={<AuthorReviewsPage />} />
      )}
    </Routes>
  );
};
