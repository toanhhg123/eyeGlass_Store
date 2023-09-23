import PencilIcon from "@heroicons/react/24/solid/PencilIcon";
import {
  Box,
  Button,
  Card,
  Checkbox,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import PropTypes from "prop-types";
import { Scrollbar } from "src/components/scrollbar";

export const TableBrand = (props) => {
  const { items = [], onClickActionEdit } = props;

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Tên Thương hiệu</TableCell>
                <TableCell>Mô tả</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((brand) => {
                return (
                  <TableRow hover key={brand._id}>
                    <TableCell>{brand.name}</TableCell>
                    <TableCell>{brand.desc}</TableCell>
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
                        onClick={() => onClickActionEdit(brand)}
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

TableBrand.propTypes = {
  items: PropTypes.array,
  onClickActionEdit: PropTypes.func,
};
