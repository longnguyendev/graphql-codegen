import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreateUserInput, useCreateUserMutation } from "../../gql/graphql";
import { Outlet } from "react-router-dom";

function SignUp() {
  const schema = yup.object({
    email: yup.string().email().required(),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    password: yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserInput>({
    resolver: yupResolver(schema),
  });

  const [createUser] = useCreateUserMutation();

  const onSubmit: SubmitHandler<CreateUserInput> = (createUserInput) => {
    createUser({
      variables: {
        createUserInput,
      },
    }).then((res) => console.log(res));
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("email")} />
        <p>{errors.email?.message}</p>

        <input {...register("firstName")} />
        <p>{errors.firstName?.message}</p>
        <input {...register("lastName")} />
        <p>{errors.lastName?.message}</p>

        <input {...register("password")} />
        <p>{errors.password?.message}</p>

        <input type="submit" />
      </form>
      <Outlet />
    </div>
  );
}

export default SignUp;
