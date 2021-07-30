// app/javascript/mutations/createMessage.js

import gql from 'graphql-tag';

const mutation = gql`
  mutation createMessage(
    $name: String!,
    $email: String!,
    $company: String!,
    $message: String!,
  ) {
    createMessage(input: {
      name: $name,
      email: $email,
      company: $company,
      message: $message,
    }) {
      success
      errors
    }
  }
`;

export default function({
  apollo,
  name,
  email,
  company,
  message
}) {
  return apollo.mutate({
    mutation,
    variables: {
      name,
      email,
      company,
      message
    },
  });
}