export const generateReviewFormValues = () => {
  return {
    title: {
      value: "",
      required: true,
      error: "",
      validateInput: (title) =>
        title.length > 3 ? null : "Title should have at least 3 characters.",
    },
    pieceName: {
      value: "",
      required: true,
      error: "",
      validateInput: (pieceName) =>
        pieceName.length > 3
          ? null
          : "Piece name should have at least 3 characters.",
    },
    category: {
      value: "",
      required: true,
      error: "",
      validateInput: (category) =>
        ["Movies", "Books", "Games"].includes(category)
          ? null
          : "Category is not valid.",
    },
    tags: {
      value: [],
      required: false,
      error: "",
    },
    content: {
      value: "",
      required: true,
      error: "",
      validateInput: (content) =>
        content.length > 10
          ? null
          : "Content should have at least 10 characters.",
    },
    image: {
      value: null,
      required: false,
      error: "",
    },
    rating: {
      value: 5,
      required: false,
      error: "",
      validateInput: (rating) =>
        rating >= 0 && rating <= 10
          ? null
          : "Rating should be between 0 and 10.",
    },
  };
};
