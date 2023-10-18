import PencilIcon from "@heroicons/react/24/solid/PencilIcon";
import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  Chip,
  Stack,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import { Scrollbar } from "src/components/scrollbar";

export const TableOrder = (props) => {
  const { items = [], onClickActionEdit } = props;

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Sản phẩm</TableCell>
                <TableCell>Người đặt</TableCell>
                <TableCell>Địa chỉ</TableCell>
                <TableCell>kích cỡ(size)</TableCell>
                <TableCell>Màu sắc</TableCell>
                <TableCell>Tổng tiền</TableCell>

                <TableCell>Trạng thái</TableCell>

                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((order) => {
                return (
                  <TableRow hover key={order._id}>
                    <TableCell>
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <Avatar src={order.product.images[0]}>{order.product.name}</Avatar>
                        <Typography variant="subtitle2">{order.product.name}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{order.user.user_name}</TableCell>
                    <TableCell>{order.user.address}</TableCell>
                    <TableCell>{order.size}</TableCell>
                    <TableCell>{order.color}</TableCell>
                    <TableCell>{order.price}</TableCell>
                    <TableCell>
                      <Chip
                        variant="outlined"
                        color="secondary"
                        label={order?.shipping?.status}
                      ></Chip>
                    </TableCell>

                    <TableCell>
                      <Button
                        startIcon={
                          <SvgIcon color="action" fontSize="small">
                            <PencilIcon />
                          </SvgIcon>
                        }
                        sx={{ borderRadius: "3px" }}
                        size="small"
                        variant="outlined"
                        color="info"
                        onClick={() => onClickActionEdit(order)}
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
    </Card>
  );
};

TableOrder.propTypes = {
  items: PropTypes.array,
  onClickActionEdit: PropTypes.func,
};
