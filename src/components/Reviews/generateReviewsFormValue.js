export const generateReviewsFormValues = (selectedReview = {}) => {
  return {
    title: {
      value: selectedReview?.title || "",
      required: true,
      error: "",
      validateInput: (title) =>
        title.length > 3 ? null : "Title should have at least 3 characters.",
    },
    pieceName: {
      value: selectedReview?.artworkName || "",
      required: true,
      error: "",
      validateInput: (pieceName) =>
        pieceName.length > 3
          ? null
          : "Piece name should have at least 3 characters.",
    },
    category: {
      value: selectedReview?.category || "",
      required: true,
      error: "",
      validateInput: (category) =>
        ["Movies", "Books", "Games"].includes(category)
          ? null
          : "Category is not valid.",
    },
    tags: {
      value: selectedReview?.tags || [],
      required: false,
      error: "",
    },
    content: {
      value: selectedReview?.content || "",
      required: true,
      error: "",
      validateInput: (content) =>
        content.length > 10
          ? null
          : "Content should have at least 10 characters.",
    },
    image: {
      value: selectedReview?.image || null,
      required: false,
      error: "",
    },
    rating: {
      value: selectedReview?.rating || "",
      required: false,
      error: "",
      validateInput: (rating) =>
        rating >= 0 && rating <= 10
          ? null
          : "Rating should be between 0 and 10.",
    },
    textarrea: {
      value: selectedReview?.textarrea || "",
      required: true,
      error: "",
      validateInput: (textarrea) =>
        textarrea.length > 10
          ? null
          : "Textarrea should have at least 10 characters.",
    },
  };
};
