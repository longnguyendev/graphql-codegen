import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as yup from "yup";
import { LoginAuthInput, useSignInMutation } from "../../gql/graphql";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/auth.context";
import { Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

const schema = yup.object({
  email: yup.string().required(),
  password: yup.string().required(),
});

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignIn() {
  const [signIn] = useSignInMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginAuthInput>({
    resolver: yupResolver(schema),
  });

  const [error, setError] = useState("");

  const { isAuth, setToken } = useAuth();

  const navigate = useNavigate();

  const handleClick: SubmitHandler<LoginAuthInput> = async (loginAuthInput) => {
    signIn({
      variables: { loginAuthInput },
      onCompleted: (res) => {
        console.log(res);
        setToken(res.signIn.access_token);
      },
      onError: (err) => {
        setError(err.message);
      },
    });
  };
  useEffect(() => {
    if (isAuth) {
      navigate("/", { replace: true });
    }
  });

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              {...register("email")}
              name="email"
              autoComplete="email"
              autoFocus
              error={Boolean(errors.email?.message)}
              helperText={errors.email?.message}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              {...register("password")}
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={Boolean(errors.password?.message)}
              helperText={errors.password?.message}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            {error && <Alert severity="error">{error}</Alert>}

            <Button
              type="submit"
              fullWidth
              onClick={handleSubmit(handleClick)}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
