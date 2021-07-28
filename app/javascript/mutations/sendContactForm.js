// app/javascript/mutations/sendContactForm.js

import gql from 'graphql-tag';

const mutation = gql`
  mutation sendContactForm(
    $name: String!,
    $email: String!,
  ) {
    sendContactForm(input: {
      name: $name,
      email: $email,
    }) {
      user {
        id
        name
        email
      }
      success
      errors
    }
  }
`;

export default function({
  apollo,
  name,
  email,
}) {
  return apollo.mutate({
    mutation,
    variables: {
      name,
      email,
    },
  });
}