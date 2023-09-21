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
import { Menu, MenuItem, Button, Box } from "@mui/material";
import { useUser } from "../../hooks";
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

  const { userInfo } = useUser();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(review._id);

  const deleteReviewHandler = () => {
    dispatch(deleteReview(review._id));
  };

  const addLikeHandler = () => {
    dispatch(addLikeToReview(review._id));
  };

  const addDisLikeHandler = () => {
    dispatch(addDisLikeToReview(review._id));
  };

  return (
    <Card className=" w-full md:w-1/2 lg:w-1/4 m-2  ">
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
                {/* {userInfo._id === review?.author?._id && ( */}
                <>
                  <MenuItem>
                    <Button onClick={deleteReviewHandler}>Delete</Button>
                  </MenuItem>
                  <MenuItem>
                    <Button
                      onClick={() => {
                        dispatch(setSelectedReview(review));
                        navigate(`/${title}/edit`);
                      }}
                    >
                      Edit
                    </Button>
                  </MenuItem>
                </>
                {/* )} */}
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
        <Typography variant="body2" color="text.secondary">
          {review.content}
        </Typography>
      </CardContent>
      <CardActions className="flex justify-between">
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
            Comments
          </Typography>

          <Comment reviewId={review._id} comments={review.comments} />
        </CardContent>
      </Collapse>
    </Card>
  );
};
