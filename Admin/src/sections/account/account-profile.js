import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";

const user = {
  avatar: "/assets/avatars/avatar-anika-visser.png",
  city: "Los Angeles",
  country: "USA",
  jobTitle: "Senior Developer",
  name: "Anika Visser",
  timezone: "GTM-7",
};

export const AccountProfile = ({ user }) => (
  <Card>
    <CardContent>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Avatar
          src={user.user_name}
          sx={{
            height: 80,
            mb: 2,
            width: 80,
          }}
        />
        <Typography gutterBottom variant="h5">
          {user.user_name}
        </Typography>
        <Typography color="text.secondary" variant="body2">
          {user.address}
        </Typography>
        <Typography color="text.secondary" variant="body2">
          {user.email}
        </Typography>
      </Box>
    </CardContent>
    <Divider />
  </Card>
);
