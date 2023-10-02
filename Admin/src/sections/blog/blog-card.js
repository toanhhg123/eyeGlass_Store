import PropTypes from "prop-types";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ClockIcon from "@heroicons/react/24/solid/ClockIcon";
import Cog6ToothIcon from "@heroicons/react/24/solid/Cog6ToothIcon";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";

import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";

export const BlogCard = (props) => {
  const { blog, onClickCard, onClickupLoad } = props;

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        cursor: "pointer",
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pb: 3,
          }}
        >
          <Avatar src={blog?.image} variant="square" />
        </Box>
        <Typography align="center" gutterBottom variant="h5">
          {blog.title}
        </Typography>
        <Typography
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: "2",
            WebkitBoxOrient: "vertical",
          }}
          align="center"
          variant="body1"
        >
          {blog.subtitle}
        </Typography>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />

      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={2}
        sx={{ p: 2 }}
      >
        <Stack alignItems="center" direction="row" spacing={1}>
          <SvgIcon color="action" fontSize="small">
            <ClockIcon />
          </SvgIcon>
          <Typography color="text.secondary" display="inline" variant="body2">
            Updated 2hr ago
          </Typography>
        </Stack>
        <Stack alignItems="center" direction="row" spacing={1}>
          <SvgIcon color="action" fontSize="small">
            <ArrowDownOnSquareIcon />
          </SvgIcon>
          {/* <Typography color="text.secondary" display="inline" variant="body2">
            {blog.quantity} số lượng
          </Typography> */}
        </Stack>
      </Stack>

      <Stack alignItems="center" direction="row" spacing={1} m={1}>
        <Button
          startIcon={
            <SvgIcon color="action" fontSize="small">
              <Cog6ToothIcon color={"white"} />
            </SvgIcon>
          }
          sx={{ borderRadius: "3px" }}
          size="small"
          variant="contained"
          color="info"
          onClick={() => onClickCard(blog)}
        >
          Chỉnh sửa
        </Button>

        <Button
          startIcon={
            <SvgIcon color="action" fontSize="small">
              <ArrowUpOnSquareIcon />
            </SvgIcon>
          }
          sx={{ borderRadius: "3px" }}
          size="small"
          variant="outlined"
          color="info"
          onClick={() => onClickupLoad(blog)}
        >
          upload
        </Button>
      </Stack>
    </Card>
  );
};

BlogCard.propTypes = {
  onClickCard: PropTypes.func.isRequired,
  onClickupLoad: PropTypes.func.isRequired,
};
