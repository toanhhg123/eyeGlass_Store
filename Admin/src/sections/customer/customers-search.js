import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import { Card, InputAdornment, OutlinedInput, SvgIcon } from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";

export const CustomersSearch = ({ onSubmit }) => {
  const [search, setSearch] = useState("");

  return (
    <Card
      component={"form"}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(search);
      }}
      sx={{ p: 2 }}
    >
      <OutlinedInput
        fullWidth
        placeholder="Search customer"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        startAdornment={
          <InputAdornment position="start">
            <SvgIcon color="action" fontSize="small">
              <MagnifyingGlassIcon />
            </SvgIcon>
          </InputAdornment>
        }
        sx={{ maxWidth: 500 }}
      />
    </Card>
  );
};

CustomersSearch.propTypes = {
  onSubmit: PropTypes.func,
};
