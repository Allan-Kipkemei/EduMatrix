import React, { useState } from "react";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { Button, Collapse } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { deleteUser, updateUser } from "../../redux/userRelated/userHandle";
import { authLogout } from "../../redux/userRelated/userSlice";

const AdminProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentUser, response, error } = useSelector(
    (state) => state.user
  );

  const [showTab, setShowTab] = useState(false);

  const [name, setName] = useState(currentUser?.name || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [schoolName, setSchoolName] = useState(
    currentUser?.schoolName || ""
  );
  const [password, setPassword] = useState("");

  const address = "Admin";

  const buttonText = showTab ? "Cancel" : "Edit profile";

  if (response) console.log(response);
  if (error) console.log(error);

  const submitHandler = (e) => {
    e.preventDefault();

    const fields =
      password === ""
        ? { name, email, schoolName }
        : { name, email, password, schoolName };

    dispatch(updateUser(fields, currentUser._id, address));
  };

  const deleteHandler = () => {
    try {
      dispatch(deleteUser(currentUser._id, "Students"));
      dispatch(deleteUser(currentUser._id, address));
      dispatch(authLogout());
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h3>Admin Profile</h3>

      <p><b>Name:</b> {currentUser.name}</p>
      <p><b>Email:</b> {currentUser.email}</p>
      <p><b>School:</b> {currentUser.schoolName}</p>

      <Button
        variant="contained"
        sx={styles.showButton}
        onClick={() => setShowTab(!showTab)}
      >
        {showTab ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
        {buttonText}
      </Button>

      <Collapse in={showTab} timeout="auto" unmountOnExit>
        <div className="register">
          <form className="registerForm" onSubmit={submitHandler}>
            <span className="registerTitle">Edit Details</span>

            <label>Name</label>
            <input
              className="registerInput"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <label>School</label>
            <input
              className="registerInput"
              type="text"
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
              required
            />

            <label>Email</label>
            <input
              className="registerInput"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Password</label>
            <input
              className="registerInput"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="registerButton" type="submit">
              Update
            </button>

            <Button
              variant="contained"
              color="error"
              onClick={deleteHandler}
              sx={{ marginTop: 2 }}
            >
              Delete Account
            </Button>
          </form>
        </div>
      </Collapse>
    </div>
  );
};

export default AdminProfile;

const styles = {
  showButton: {
    backgroundColor: "#270843",
    marginTop: "10px",
    "&:hover": {
      backgroundColor: "#3f1068",
    },
  },
};
