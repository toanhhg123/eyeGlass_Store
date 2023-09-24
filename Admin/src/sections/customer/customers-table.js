import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
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
import { getInitials } from "src/utils/get-initials";
import PencilIcon from "@heroicons/react/24/solid/PencilIcon";
import LockClosedIcon from "@heroicons/react/24/solid/LockClosedIcon";

export const CustomersTable = (props) => {
  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onSelectAll,
    onSelectOne,
    selected = [],
    onClickActionEdit,
    onClickChangePassword,
  } = props;

  const selectedSome = selected.length > 0 && selected.length < items.length;
  const selectedAll = items.length > 0 && selected.length === items.length;

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAll}
                    indeterminate={selectedSome}
                    onChange={(event) => {
                      if (event.target.checked) {
                        onSelectAll?.();
                      } else {
                        onDeselectAll?.();
                      }
                    }}
                  />
                </TableCell>
                <TableCell>Tên người dùng</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Quyền hạn</TableCell>
                <TableCell>Dịa chỉ</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((customer) => {
                const isSelected = selected.includes(customer._id);

                return (
                  <TableRow hover key={customer._id} selected={isSelected}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(customer._id);
                          } else {
                            onDeselectOne?.(customer._id);
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <Avatar src={customer.a}>{getInitials(customer.user_name)}</Avatar>
                        <Typography variant="subtitle2">{customer.user_name}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{customer.role}</TableCell>
                    <TableCell>{customer.address}</TableCell>
                    <TableCell sx={{ display: "flex", gap: 1 }}>
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
                        onClick={() => onClickActionEdit(customer)}
                      >
                        chỉnh sửa
                      </Button>

                      <Button
                        startIcon={
                          <SvgIcon color="action" fontSize="small">
                            <LockClosedIcon />
                          </SvgIcon>
                        }
                        sx={{ borderRadius: "3px" }}
                        size="small"
                        variant="outlined"
                        color="info"
                        onClick={() => onClickChangePassword(customer)}
                      >
                        mật khẩu
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

CustomersTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
  onClickActionEdit: PropTypes.func,
  onClickChangePassword: PropTypes.func,
};
