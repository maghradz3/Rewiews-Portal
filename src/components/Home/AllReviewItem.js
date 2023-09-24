import * as React from "react";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { getAuthorInitials } from "../../helpers";
import { Menu, MenuItem, Button, Box, Alert as MUIAlert } from "@mui/material";
import { useAlert, useReview, useUser } from "../../hooks";
import { useDispatch } from "react-redux";
import {
  deleteReview,
  getSingleREview,
  setSelectedReview,
} from "../../redux/slice";

import { AiFillStar } from "react-icons/ai";
import { addLikeToReview, addDisLikeToReview } from "../../redux/slice";
import { IoHeartDislike } from "react-icons/io5";

import { Comment } from "../Comments";
import { useNavigate } from "react-router";
import { isUserAdmin } from "../../helpers";
import { Alert, LoadingWrapper } from "../../atoms";
import { useTranslation } from "react-i18next";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const StyledBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",

  borderRadius: 10,
}));

export const AllReviewItem = ({ review }) => {
  const { title } = review;
  const [expanded, setExpanded] = useState(false);
  const [anchor, setAnchor] = useState(null);
  const { t, i18n } = useTranslation();

  const { alertState, handleClose, showAlert } = useAlert();

  const { userInfo } = useUser();
  const { loading, error } = useReview();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const deleteReviewHandler = () => {
    dispatch(deleteReview(review._id))
      .unwrap()
      .then(() => {})
      .catch((error) => {
        const { message } = error;
        const errorMessage = `${message} This is not your review!`;
        showAlert("error", errorMessage);
      });
  };

  const addLikeHandler = () => {
    dispatch(addLikeToReview(review._id))
      .unwrap()
      .catch((error) => {
        const { message } = error;
        const actionMessage = userInfo
          ? "You already Liked this Review"
          : "You are not Authenticated";
        const errorMessage = `${message} ${actionMessage}`;
        showAlert("error", errorMessage);
      });
  };

  const addDisLikeHandler = () => {
    dispatch(addDisLikeToReview(review._id));
  };

  const buttonInfo =
    isUserAdmin(userInfo) || review?.author?._id === userInfo?._id;
  console.log(buttonInfo);

  return (
    <LoadingWrapper isLoading={loading}>
      <Card className=" w-full md:w-1/2 lg:w-1/4 relative m-2  ">
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {review?.author?.profilePicture ? (
                <img
                  alt={review.title}
                  className="w-full h-full"
                  src={review.author.profilePicture}
                />
              ) : (
                getAuthorInitials(review)
              )}
            </Avatar>
          }
          action={
            <>
              <IconButton
                onClick={(e) => setAnchor(e.currentTarget)}
                aria-label="settings"
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                anchorEl={anchor}
                open={Boolean(anchor)}
                onClose={() => setAnchor(null)}
              >
                <StyledBox>
                  {buttonInfo ? (
                    <>
                      <MenuItem>
                        <Button onClick={deleteReviewHandler}>
                          {t("delete")}
                        </Button>
                      </MenuItem>
                      <MenuItem>
                        <Button
                          onClick={() => {
                            dispatch(setSelectedReview(review));
                            navigate(`/${title}/edit`);
                          }}
                        >
                          {t("edit")}
                        </Button>
                      </MenuItem>
                    </>
                  ) : (
                    <MUIAlert severity="error">
                      {t("this is not your review")}
                    </MUIAlert>
                  )}
                </StyledBox>
              </Menu>
            </>
          }
          title={review.title}
          subheader={review.artworkName}
        />
        <CardMedia
          onClick={() => {
            dispatch(getSingleREview(review._id));
            navigate(`/singleReview/${review._id}`);
          }}
          className="h-[300px] object-cover w-full object-center cursor-pointer"
          component="img"
          image={review.image}
          alt="Paella dish"
        />
        <CardContent>
          <Typography
            variant="body2"
            color="text.secondary"
            className="truncate-3-lines"
          >
            {review.content}
          </Typography>
        </CardContent>
        <CardActions className="flex justify-between ">
          <IconButton aria-label="add to favorites" onClick={addLikeHandler}>
            <FavoriteIcon
              sx={
                review?.likes[0]?.user === userInfo?._id ? { color: "red" } : {}
              }
            />
          </IconButton>
          <h1>{review.likes.length}</h1>
          <IconButton aria-label="add to favorites" onClick={addDisLikeHandler}>
            <IoHeartDislike />
          </IconButton>

          <h1 className="flex justify-between cursor-pointer ">
            <AiFillStar className="text-2xl text-orange-500  " />
            {review.rating}/10
          </h1>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent className="flex flex-col">
            <Typography className="self-center" paragraph>
              {t("comment")}
            </Typography>

            <Comment reviewId={review._id} comments={review.comments} />
          </CardContent>
        </Collapse>
      </Card>
      <Alert {...alertState} handleClose={handleClose} />
    </LoadingWrapper>
  );
};
