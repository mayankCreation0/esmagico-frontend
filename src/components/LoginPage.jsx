import {
    FormControl,
    FormLabel,
    Input,
    Box,
    InputRightAddon,
    InputGroup,
    Heading,
    useToast, Select
} from "@chakra-ui/react";
import { useContext, useEffect, useRef, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { context } from "../AuthContext/context";
import "../Style/login.style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Cookies from 'universal-cookie';
// import png from ' ../assets/Gmail_Logo_16px.png';

const LoginPage = () => {
    // const { fnstore } = useContext(context)
    const cookies = new Cookies();
    const { authstate, fnauthstate, falseAuthState } = useContext(context);
    const [input, setInput] = useState({
        email: "",
        password: "",
    });
    const toast = useToast();
    const [showPassword, setShowPassword] = useState(false);
    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
    };
    const inputRef = useRef(null);
    useEffect(() => {
        inputRef.current.focus();
    }, []);
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.post(
                "https://esmagico-backend-84ul.vercel.app/user/login",
                input
            );
            console.log(res.data.token);
            if (res.data.token) {
                cookies.set('token', res.data.token, { path: '/' });

                setTimeout(() => {
                    console.log(cookies.get('token'))
                }, 1000);
                toast({
                    title: 'LoggedIn Sucessfully.',
                    description: "Welcome!!",
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                })
                console.log("res",res.data.user);
                fnauthstate();
            }
            else {
                toast({
                    title: "Invalid credentials",
                    description: "",
                    status: "error",
                    duration: 4000,
                    isClosable: true,
                });
                falseAuthState();
            }
        } catch (e) {
            toast({
                title: "Invalid credentials",
                description: "",
                status: "error",
                duration: 4000,
                isClosable: true,
            });
            console.log(e);
        }
    };
    return (
        <div>
            {authstate ? (
                <Navigate to="/home" />
            ) : (
                <>
                    <Box
                        w="100vw"
                        h="100vh"
                        backgroundImage="linear-gradient(to right top, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1)"
                        backgroundSize="cover"
                        backgroundPosition="center"
                        alignItems="center"
                        justifyContent="center"
                        display="flex"
                    >
                        <form
                            onSubmit={handleSubmit}
                            style={{
                                // backgroundImage:
                                //   "linear-gradient(to right top, #d2d7e0, #c8d3d7, #c3cdcd, #c1c7c3, #bfc0bc)",
                                backgroundColor: "#FFF",
                                padding: "20px",
                                width: "50%",
                                height: "auto",
                                borderRadius: "20px",
                            }}
                        >
                            <Heading
                                as="h1"
                                size={["md", "xl"]}
                                color="teal"
                                fontSize="4xl"
                                fontWeight="medium"
                            >
                                WELCOME
                            </Heading>
                            <FormControl>
                                <FormLabel htmlFor="String">Email</FormLabel>
                                <Input
                                    type="String"
                                    id="email"
                                    name="email"
                                    border="1px solid black"
                                    bg="white"
                                    ref={inputRef}
                                    onChange={handleChange}
                                    placeholder="Enter your email address"
                                />
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel htmlFor="password">Password</FormLabel>
                                <InputGroup>
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        name="password"
                                        bg="white"
                                        // ref={inputRef}
                                        border="1px solid black"
                                        placeholder="Enter your password"
                                        onChange={handleChange}
                                    />
                                    <InputRightAddon
                                        onClick={() => setShowPassword(!showPassword)}
                                        cursor="pointer"
                                    >
                                        <FontAwesomeIcon
                                            icon={showPassword ? faEye : faEyeSlash}
                                            cursor="pointer"
                                            border="1px solid black"
                                            onClick={() => setShowPassword(!showPassword)}
                                            size="lg"
                                        />
                                    </InputRightAddon>
                                </InputGroup>
                            </FormControl>
                              
                            <button className="stylish-button" type="submit">
                                LOGIN
                            </button>
                            <Link to='/signup'><button style={{ borderBottom: '1px solid blue', color: 'blue', marginLeft: '20px' }} type="click">
                                New User
                            </button></Link>
                        </form>
                    </Box>
                </>
            )}
        </div>
    );
};

export default LoginPage;
