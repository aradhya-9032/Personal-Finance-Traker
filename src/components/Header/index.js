// import React from "react";
// import './style.css';

// function Header(){
//     function logoutFun(){
//          alert("logout")
//     }
//     return(
//         <div className="navbar">
//             <p className="logo">Financely</p>
//             <p className="logo link" onClick={logoutFun}>Logout</p>
//         </div>
//     )
// }

// export default Header;


// import React, { useEffect } from "react";
// import "./style.css";
// import { signOut } from "firebase/auth";
// import { auth } from "./../../firebase";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import { useAuthState } from "react-firebase-hooks/auth";
// import logoutIcon from "../../assist/images/logout.png";

// const Header = () => {
//   const [user, loading] = useAuthState(auth);
//   const navigate = useNavigate();
//   useEffect(() => {
//     if (!user) {
//       navigate("/");
//     } else {
//         if (!localStorage.getItem("user")) {
//             localStorage.setItem("user", true);
//           }
//           navigate("/dashboard");
//         }
//         console.log(user, "<<<<<user1");
//       }, [user, loading]);
//       function Logout() {
//         try {
//           signOut(auth)
//             .then(() => {
//               // Sign-out successful.
//               if (localStorage.getItem("user")) {
//                 localStorage.removeItem("user");
//               }
//               toast.success("Logout Successful");
//               navigate("/");
//             })
//             .catch((error) => {
//               // An error happened.
//               toast.error(error.message);
//             });
//         } catch (err) {
//           console.log(err);
//           toast.error(err.message);
//         }
//       }
//       return (
//         <div className="navbar">
//           <p className="logo">Finance</p>
//           {user && (
//             <div className="profile">
//               <img
//                 src={
//                   user.photoURL
//                     ? user.photoURL
//                     : "https://www.w3schools.com/howto/img_avatar.png"
//                 }
//                 alt="profile"
//                 className="UserProfileImg"
//               />
//                  {logoutIcon ? (
//             <img
//               src={logoutIcon}
//               alt="Logout"
//               onClick={() => Logout()}
//               className="logout-btn"
//             />
//           ) : (
//             "Logout"
//           )}
//         </div>
//       )}
//     </div>
//   );
// };
// export default Header;


import React, { useEffect } from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import userSvg from "../../assets/user.svg";
function Header() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  function logout() {
    auth.signOut();
    navigate("/");
  }

  useEffect(() => {
    if (!user) {
      navigate("/");
    } else {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <div className="navbar">
      <p className="navbar-heading">Financly.</p>
      {user ? (
        <p className="navbar-link" onClick={logout}>
          <span style={{ marginRight: "1rem" }}>
            <img
              src={user.photoURL ? user.photoURL : userSvg}
              width={user.photoURL ? "32" : "24"}
              style={{ borderRadius: "50%" }}
            />
          </span>
          Logout
        </p>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Header;

