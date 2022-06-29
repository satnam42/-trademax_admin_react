import axios from "axios";
import { useState, useEffect } from "react";
import * as validate from '../utils/validator'
import * as apiLinks from './apiLinks'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const token = localStorage.getItem("token");

// AXIOS INSTANCE WITH TOKEN
const axiosWithToken = axios.create({
  // Other custom settings
  baseURL: apiLinks.BASE_URL,
});
// AXIOS INSTANCE WITHOUT TOKEN
const axiosWithoutToken = axios.create({
  // Other custom settings
  baseURL: apiLinks.BASE_URL,
});
// axiosInstance.get('/comments').then(res => console.log(res));

axiosWithToken.defaults.headers.common[
  "Authorization"
] = `Bearer ${localStorage.getItem("jwt")}`

// INTERCEPTING REQUESTS & RESPONSES
axiosWithoutToken.interceptors.request.use(
  (config) => {
    console.log(
      `${config.method.toUpperCase()} request sent to ${config.url
      } at ${new Date().getTime()} without token`
    );

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosWithToken.interceptors.request.use(
  (config) => {
    console.log(
      `${config.method.toUpperCase()} request sent to ${config.url
      } at ${new Date().getTime()}`
    );

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//Simultaneously Data Fetching
function getData() {
  axios
    .all([
      axios.get("url1"),
      axios.get("url2"),
    ])
    .then(axios.spread((todos, posts) => console.log(posts)))
    .catch((err) => console.error(err));
}


const EMAIL_ERROR = "Please enter a valid E-Mail"
const USERNAME_ERROR = "Please enter a valid username"
const PASSWORD_ERROR = "Please enter a strong password"


export const useGetSetPost = () => {
  useEffect(() => {
    axiosWithToken.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("jwt")}`;
  }, []);

  const [loading, setLoading] = useState(false);

  const [data, setData] = useState()

  const [apiError, setApiError] = useState(false)


  //input handling


  const handleInputChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case "email": {
        if (!!validate.nameValid(value)) {
          setData({ ...data, [name]: value, formErrors: { ...data.formErrors, [name]: EMAIL_ERROR } })
        } else {
          setData({ ...data, [name]: value, formErrors: { ...data.formErrors, [name]: true } })
        }
        break;
      }
      case "username": {
        if (!!validate.nameValid(value)) {
          setData({ ...data, [name]: value, formErrors: { [name]: USERNAME_ERROR } })
        } else {
          setData({ ...data, [name]: value, formErrors: { [name]: true } })
        }
        break;
      }

      case "password": {
        if (!!validate.passwordPattern(value)) {
          setData({ ...data, [name]: value, formErrors: { [name]: PASSWORD_ERROR } })
        } else {
          setData({ ...data, [name]: value, formErrors: { [name]: true } })
        }
        break;
      }

      default: {
      }
    }
  };


  //function


  const getApi = async (pathname, successActions, errActions) => {
    setLoading(true)
    let response;

    let gotFuntion = Boolean(successActions && typeof (successActions) === "function")


    try {
      if (
        pathname === apiLinks.LOGIN ||
        pathname === apiLinks.FORGOT_PASSWORD ||
        pathname === apiLinks.SIGNUP ||
        pathname === apiLinks.GET_USERS

      ) {
        response = await axiosWithoutToken.get(pathname);

      } else {
        response = await axiosWithToken.get(pathname);
      }

      const responseObj = response.data;


      if (responseObj.data) {

        gotFuntion && successActions(responseObj.data)

        setData(responseObj.data)
      }
      else if (responseObj.items) {
        gotFuntion && successActions(responseObj.items)
        setData(responseObj.items)
      }
      else {
        gotFuntion && successActions(responseObj.message)
        setData(responseObj.message)
      }



      setLoading(false)
    } catch (error) {
      if (error.response) {
        if (errActions && typeof (errActions) === "function") {
          errActions(error.response.data.message)
        }
        else {
          toast.error(error.response.data.message);
          // alert(error.response.data.message)
        }
        setApiError(error.response.data.message)

      } else {
        if (errActions && typeof (errActions) === "function") {
          errActions("Request not reached at server")
        }
        else {
          toast.error("Request not reached at server");

          // alert("Request not reached at server")
        }
        setApiError("Request not reached at server")
      }
      setLoading(false)
    }
  };


  // put function 

  const putApi = async (pathname, body, successActions, errActions) => {
    setLoading(true)
    let response;
    try {
      if (
        pathname === apiLinks.LOGIN ||
        pathname === apiLinks.FORGOT_PASSWORD ||
        pathname === apiLinks.SIGNUP
      ) {
        response = await axiosWithoutToken.put(pathname, body);

      } else {
        response = await axiosWithToken.put(pathname, body);
      }

      const responseObj = response.data;

      if (successActions && typeof (successActions) === "function") {
        if (responseObj.data) {
          successActions(responseObj.data)
          setData(responseObj.data)
        }
        else if (responseObj.items) {
          successActions(responseObj.items)
          setData(responseObj.items)
        }
        else {
          successActions(responseObj.message)
          setData(responseObj.message)
        }
      }
      setLoading(false)
    } catch (error) {
      if (error.response) {
        if (errActions && typeof (errActions) === "function") {
          errActions(error.response.data.message)
        }
        else {
          toast.error(error.response.data.message);
          // alert(error.response.data.message)
        }
        setApiError(error.response.data.message)

      } else {
        if (errActions && typeof (errActions) === "function") {
          errActions("Request not reached at server")
        }
        else {
          toast.error("Request not reached at server");
          // alert("Request not reached at server")
        }
        setApiError("Request not reached at server")
      }
      setLoading(false)
    }
  };



  //post function


  const postApi = async (pathname, body, successActions, errActions) => {
    setLoading(true)
    toast.configure();
    let response;
    try {
      if (
        pathname === apiLinks.LOGIN ||
        pathname === apiLinks.FORGOT_PASSWORD ||
        pathname === apiLinks.SIGNUP
      ) {
        response = await axiosWithoutToken.post(pathname, body);

      } else {
        response = await axiosWithToken.post(pathname, body);
      }

      const responseObj = response.data;

      if (successActions && typeof (successActions) === "function") {
        if (responseObj.data) {
          successActions(responseObj.data)
          setData(responseObj.data)
        }
        else if (responseObj.items) {
          successActions(responseObj.items)
          setData(responseObj.items)
        }
        else {
          successActions(responseObj.message)
          setData(responseObj.message)
        }
      }
      setLoading(false)
    } catch (error) {
      if (error.response) {
        if (errActions && typeof (errActions) === "function") {
          errActions(error.response.data.message)
        }
        else {
          // toast("Wow so easy!");
          toast.error(error.response.data.message);
          // alert(error.response.data.message)
        }
        setApiError(error.response.data.message)

      } else {
        if (errActions && typeof (errActions) === "function") {
          errActions("Request not reached at server")
        }
        else {
          // alert("Request not reached at server")
          toast.error("Request not reached at server");
        }
        setApiError("Request not reached at server")
      }
      setLoading(false)
    }
  };

  return { loading, data, apiError, getApi, putApi, postApi, handleInputChange };
}



