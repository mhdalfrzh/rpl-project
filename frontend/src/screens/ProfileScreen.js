import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Axios from "../../node_modules/axios/index";
import { detailsUser, updateUserProfile } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";
import Navbar from "../other/Navbar";
import "../css/profil.css";
import Footer from "../other/Footer";
import { LogoIPB2 } from "../Logo";

export default function ProfileScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [noHandphone, setNoHandphone] = useState("");
  const [nim, setNim] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState("");
  const [sellerName, setSellerName] = useState("");
  const [sellerLogo, setSellerLogo] = useState("");
  const [sellerDescription, setSellerDescription] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo1 } = userSignin;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const dispatch = useDispatch();
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = userUpdateProfile;
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState("");
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("image", file);
    setLoadingUpload(true);
    try {
      const { data } = await Axios.post("/api/uploads", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo1.token}`,
        },
      });
      setImage(data);
      setLoadingUpload(false);
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
  };

  useEffect(() => {
    if (!user) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(detailsUser(userInfo1._id));
    } else {
      setName(user.name);
      setEmail(user.email);
      setNoHandphone(user.noHandphone);
      setNim(user.nim);
      setImage(user.image);
      if (user.seller) {
        console.log(user.seller.name);
        setSellerName(user.seller.name);
        setSellerLogo(user.seller.logo);
        setSellerDescription(user.seller.description);
      }
    }
  }, [dispatch, userInfo1._id, user]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      updateUserProfile({
        userId: user._id,
        name,
        email,
        noHandphone,
        nim,
        password,
        image,
        sellerName,
        sellerLogo,
        sellerDescription,
      })
    );
    setIsEditing(false);
  };

  return (
    <>
      <Navbar />
      <LogoIPB2 />
      <div className="profAccount">
        <h1 className="profilTitle">Pengaturan Akun</h1>
        <div>
          {loading ? (
            <LoadingBox />
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <div className="accBox">
              <div className="accleft">
                <img
                  className="medium-profile"
                  src={user.image}
                  alt={user.name}
                ></img>
                <input
                  type="file"
                  id="imageFile"
                  label="Choose Image"
                  onChange={uploadFileHandler}
                  style={{ display: "none" }}
                ></input>
                {isEditing && (
                  <label for="imageFile">
                    <div className="profBtnUpload">
                      <h1>Ganti Foto</h1>
                    </div>
                  </label>
                )}
              </div>

              <form className="accright" onSubmit={submitHandler}>
                {loadingUpdate && <LoadingBox></LoadingBox>}
                {errorUpdate && (
                  <MessageBox variant="danger">{errorUpdate}</MessageBox>
                )}
                {successUpdate && (
                  <MessageBox variant="success">
                    Profile Updated Successfully
                  </MessageBox>
                )}

                <div>
                  {loadingUpload && <LoadingBox></LoadingBox>}
                  {errorUpload && (
                    <MessageBox variant="danger">{errorUpload}</MessageBox>
                  )}
                </div>
                <div className="profIn">
                  <h1>Nama Lengkap</h1>
                  <input
                    id="name"
                    type="text"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => {
                      if (isEditing) setName(e.target.value);
                    }}
                  ></input>
                </div>
                <div className="profIn">
                  <h1>NIM</h1>
                  <input
                    id="nim"
                    type="text"
                    placeholder="Enter nim"
                    value={nim}
                    onChange={(e) => {
                      if (isEditing) setNim(e.target.value);
                    }}
                  ></input>
                </div>
                <div className="profIn">
                  <h1>Email</h1>
                  <input
                    id="email"
                    type="text"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => {
                      if (isEditing) setEmail(e.target.value);
                    }}
                  ></input>
                </div>

                <div className="profIn">
                  <h1>Password</h1>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => {
                      if (isEditing) setPassword(e.target.value);
                    }}
                  ></input>
                </div>

                <div className="profIn">
                  <h1>No HP</h1>
                  <input
                    id="noHandphone"
                    type="text"
                    placeholder="Enter No Handphone"
                    value={noHandphone}
                    onChange={(e) => {
                      if (isEditing) setNoHandphone(e.target.value);
                    }}
                  ></input>
                </div>
                {isEditing && (
                  <button className="profBtnSave" type="submit">
                    <h1>Simpan Perubahan</h1>
                  </button>
                )}
                {!isEditing && (
                  <button
                    className="profBtnSave"
                    onClick={() => setIsEditing(true)}
                  >
                    <h1>Edit Profil</h1>
                  </button>
                )}
              </form>
            </div>
          )}
        </div>
      </div>
      <Footer margin={"180px"} />
    </>
  );
}
