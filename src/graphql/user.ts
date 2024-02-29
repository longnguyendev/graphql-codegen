import { gql } from "@apollo/client";

export const GetUserByIdDocument = gql(`
  query GetUserById($id: Float!) {
    getUserById(id: $id) {
      id
      email
    }
  }
`);

export const GetUsersdDocument = gql(`
  query Users {
    users {
      id
      email
      firstName
      lastName
  }
  }
`);

export const CreateUserDocument = gql(`
  mutation CreateUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      access_token
    }
  }
`);

export const LoginDocument = gql(`
  mutation SignIn($loginAuthInput: LoginAuthInput!) {
    signIn(loginAuthInput: $loginAuthInput) {
      access_token
    }
  }
`);

export const currentUserDocument = gql(`
  query currentUser {
    currentUser {
      id
      email
      firstName
      lastName
    }
  }
`);
