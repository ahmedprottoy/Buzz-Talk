import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Stack from "@mui/material/Stack";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Modal } from "react-responsive-modal";
import classes from "../Styles/modals.module.css";
import axios from "axios";
import config from "../config";
import { useNavigate } from "react-router-dom";

export default function MenuListComposition(props) {
  // const [postId, setPostID] = useState();
  const [deletePostID, setDeletePostID] = useState(null);

  const navigate = useNavigate();

  //dd
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  //modal
  const [opens, setOpens] = useState(false);
  const onOpenModal = () => {
    setOpens(true);
  };
  // console.log(deletePostID);
  const onCloseModal = () => setOpens(false);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
    setDeletePostID(props.postId);
    console.log(props.postId);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  const deletePost = () => {
    console.log("object");
    axios
      .delete(`http://localhost:3003/auth/post/${deletePostID}`, config())
      .then((response) => {
        console.log(response.data);
        setDeletePostID(null);
      });
    window.location.reload(false);
  };
  return (
    <Stack direction="row" spacing={2}>
      <div>
        <Button
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? "composition-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <MoreVertIcon />
        </Button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom-start" ? "left top" : "left bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem onClick={props.ClickEdit}>Edit</MenuItem>
                    <MenuItem onClick={onOpenModal}>Delete</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>

        {/* <button onClick={onOpenModal}>Open modal</button> */}
        <Modal
          open={opens}
          onClose={onCloseModal}
          center
          classNames={{
            modal: "button",
            closeIcon: "closeIcon",
          }}
        >
          <h2>DELETE?</h2>
          <p>Sure You Want To Delete This Post?</p>

          <button
            onClick={deletePost}
            style={{
              width: "35%",
              padding: 10,
              margin: 20,
              backgroundColor: "#ff9696",
              cursor: "pointer",
            }}
          >
            Yes
          </button>
          <button
            onClick={onCloseModal}
            style={{
              width: "35%",
              padding: 10,
              margin: 20,
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        </Modal>
      </div>
    </Stack>
  );
}
