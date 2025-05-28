import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import { styled } from "@mui/material/styles";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../utils/SupaClient";
import { useAuth } from "../../utils/store/useAuth";

const StyledMenu = styled(Menu)(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: "12px",
    minWidth: 200,
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
    padding: theme.spacing(1),
  },
}));

export default function ProfileMenu({ setUser, setMenuOpen }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [avatarUrl, setAvatarUrl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const { logout, user, username } = useAuth();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, logout!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await logout();
        setUser(null);
        setMenuOpen(false);

        Swal.fire({
          icon: "success",
          title: "Logged out!",
          text: "You have been logged out successfully.",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          navigate("/");
        });
      }
    });
  };

  React.useEffect(() => {
    const fetchAvatar = async () => {
      if (user) {
        const { data, error } = await supabase
          .from("profiles")
          .select("avatar_url")
          .eq("id", user.id)
          .single();

        if (error) {
          console.error("Error fetching avatar_url:", error.message);
          return;
        }

        if (data?.avatar_url) {
          const { data: imageData, error: urlError } = supabase.storage
            .from("avatars")
            .getPublicUrl(`avatar_url/${data.avatar_url}`);

          if (urlError) {
            console.error("Error getting public URL:", urlError.message);
          } else {
            console.log("Avatar URL:", imageData.publicUrl); // Debug
            setAvatarUrl(imageData.publicUrl);
          }
        }
      }
    };

    fetchAvatar();
  }, [user]);

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
            <Avatar
              src={avatarUrl || undefined}
              sx={{
                width: 40,
                height: 40,
                bgcolor: avatarUrl ? "transparent" : "primary.main",
              }}
            >
              {!avatarUrl && (username?.charAt(0).toUpperCase() || "U")}
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <StyledMenu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          onClick={() => {
            navigate("/profile");
            handleClose();
          }}
          sx={{
            borderRadius: "8px",
            transition: "0.3s",
            "&:hover": { bgcolor: "#f0f0f0" },
          }}
        >
          <Avatar
            src={avatarUrl || undefined}
            sx={{ width: 32, height: 32, mr: 1 }}
          >
            {!avatarUrl && (username?.charAt(0).toUpperCase() || "U")}
          </Avatar>
          Profile
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={handleLogout}
          sx={{
            borderRadius: "8px",
            transition: "0.3s",
            "&:hover": { bgcolor: "#f0f0f0" },
          }}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </StyledMenu>
    </React.Fragment>
  );
}
