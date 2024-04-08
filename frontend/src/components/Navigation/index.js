import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import OpenModalButton from "../OpenModalButton";
import LoginForm from "../LoginForm";
import SignupForm from "../SignupForm";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

//   let sessionLinks;
//   if (sessionUser) {
//     sessionLinks = (
//       <li>
//         <ProfileButton user={sessionUser} />
//       </li>
//     );
//   } else {
//     sessionLinks = (
//       <div>
//         <OpenModalButton
//           buttonText="Log In"
//           modalComponent={<LoginForm />}
//         />
//         <OpenModalButton
//           buttonText="Sign Up"
//           modalComponent={<SignupForm />}
//         />
//       </div>
//     );
//   }

  return (
    <>
    <div>
        <div>
          DoorDart
        </div>
        <div>
        <OpenModalButton
          buttonText="Log In"
          modalComponent={<LoginForm />}
        />
        <OpenModalButton
          buttonText="Sign Up"
          modalComponent={<SignupForm />}
        />
        </div>
      {/* {isLoaded && sessionLinks} */}
    </div>
    </>
  );
}

export default Navigation;
