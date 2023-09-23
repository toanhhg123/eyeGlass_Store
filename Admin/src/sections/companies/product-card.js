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

export const ProductCard = (props) => {
  const { product, onClickCard, onClickupLoad } = props;

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
          <Avatar src={product.images[0]} variant="square" />
        </Box>
        <Typography align="center" gutterBottom variant="h5">
          {product.name}
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
          {product.desc}
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
          <Typography color="text.secondary" display="inline" variant="body2">
            {product.quantity} số lượng
          </Typography>
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
          onClick={() => onClickCard(product)}
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
          onClick={() => onClickupLoad(product)}
        >
          upload
        </Button>
      </Stack>
    </Card>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  onClickCard: PropTypes.func.isRequired,
  onClickupLoad: PropTypes.func.isRequired,
};
