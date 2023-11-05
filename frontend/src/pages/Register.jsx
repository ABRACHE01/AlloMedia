import { useState, useEffect } from "react";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { register, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .required("Password is required"),
  repeat_password: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),
});

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const list = [
    {
      role: "Deliver",
      img: "Images/deliver.jpg",
    },
    {
      role: "Client",
      img: "Images/client.jpg",
    },
  ];
  const [chosenRole, setChosenRole] = useState({
    isChosen: false,
    role: "",
  });

  const { isChosen, role } = chosenRole;

  const { isLoading, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (message?.error) {
      if (Array.isArray(message.error)) {
        message.error.forEach((errorMessage) => {
          toast.error(errorMessage);
        });
      } else {
        toast.error(message.error);
      }
    }

    if (message?.message) {
      toast.success(message.message);
      navigate("/login");
    }

    dispatch(reset());
  }, [message, dispatch]);

  const initialValues = {
    name: "",
    email: "",
    password: "",
    repeat_password: "",
    role: "",
  };

  const onSubmit = (values) => {
    
    dispatch(register(values));
  };

  return (
    <>
      {isLoading && <Spinner />}
      {isChosen ? (
        <section className="bg-gray-50 dark:bg-gray-900">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create an account as{" "}
                  <span className="font-bold text-success-600">{role}</span>
                </h1>
                <Formik
                  initialValues={{ ...initialValues, role: role }}
                  onSubmit={onSubmit}
                  validationSchema={validationSchema}
                >
                  <Form className="space-y-4 md:space-y-6">
                    <Field
                      type="text"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-success-600 focus:border-success-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      id="name"
                      name="name"
                      placeholder="Enter your name"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="error"
                    />

                    <Field
                      type="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-success-600 focus:border-success-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      id="email"
                      name="email"
                      placeholder="Enter your email"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="error"
                    />

                    <Field
                      type="password"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-success-600 focus:border-success-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      id="password"
                      name="password"
                      placeholder="Enter password"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="error"
                    />

                    <Field
                      type="password"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-success-600 focus:border-success-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      id="repeat_password"
                      name="repeat_password"
                      placeholder="Confirm password"
                    />
                    <ErrorMessage
                      name="repeat_password"
                      component="div"
                      className="error"
                    />
                    

                    <div className="form-group">
                      <Field
                        type="text"
                        id="role"
                        name="role"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-success-600 focus:border-success-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={role}
                        disabled
                      />
                      <ErrorMessage
                        name="role"
                        component="div"
                        className="error"
                      />
                    </div>
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="terms"
                          aria-describedby="terms"
                          type="checkbox"
                          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-success-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-success-600 dark:ring-offset-gray-800"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label className="font-light text-gray-500 dark:text-gray-300">
                          I accept the{" "}
                          <a
                            className="font-medium text-success-600 hover:underline dark:text-success-500"
                            href="#"
                          >
                            Terms and Conditions
                          </a>
                        </label>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full text-white bg-success-600 hover:bg-success-700 focus:ring-4 focus:outline-none focus:ring-success-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-success-600 dark:hover:bg-success-700 dark:focus:ring-success-800"
                    >
                      Submit
                    </button>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Already have an account?{" "}
                      <Link
                        to="/login"
                        className="font-medium text-success-600 hover:underline dark:text-success-500"
                      >
                        Login here
                      </Link>
                    </p>
                  </Form>
                </Formik>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <>
          <div className="flex flex-col justify-center items-center h-[30rem] bg-gray-50 ">
            <h1 className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text leading-12 bg-gradient-to-r from-green-400 to-purple-500" >
              Choose Your Role
            </h1>
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 bg-gray-50 dark:bg-gray-900">
              {list.map((user, index) => (
                <Card
                  shadow="sm"
                  key={index}
                  isPressable
                  onPress={() =>
                    setChosenRole({
                      isChosen: true,
                      role: user.role,
                    })
                  }
                >

                  <CardBody className="overflow-visible p-0">
                    <Image
                      shadow="sm"
                      radius="lg"
                      width="100%"
                      isZoomed
                      alt={user.role}
                      className="w-[15rem] object-cover h-[15rem]"
                      src={user.img}
                    />
                  </CardBody>
                  <CardFooter className="text-small justify-center">
                    <b>{user.role}</b>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Register;
