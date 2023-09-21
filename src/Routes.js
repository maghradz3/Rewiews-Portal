import React from "react";
import { Route, Routes } from "react-router";
import {
  HomePage,
  RegisterPage,
  LoginPage,
  ReviewPage,
  AuthorReviewsPage,
  AdminPanelPage,
} from "./pages";
import { useUser } from "./hooks";
import { isUserAdmin } from "./helpers";
import { SingleReviewPage } from "./pages/SingleReviewPage";

export const RouteComponent = () => {
  const { userInfo } = useUser();
  const admin = isUserAdmin(userInfo);
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/singleReview/:reviewId" element={<SingleReviewPage />} />
      {userInfo && <Route path="/reviewUpload" element={<ReviewPage />} />}
      {userInfo && <Route path="/:title/edit" element={<ReviewPage />} />}
      {userInfo && (
        <Route path="/authorReviews" element={<AuthorReviewsPage />} />
      )}
      {admin && <Route path="/adminPanel" element={<AdminPanelPage />} />}
    </Routes>
  );
};
