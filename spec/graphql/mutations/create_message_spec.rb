# frozen_string_literal: true

require "rails_helper"

RSpec.describe Mutations::CreateMessage do
  it "creates the message" do
    variables = {
      "name" => "James Knight",
      "email" => "gr@gmail.com",
      "company" => "Coca Cola",
      "message" => "Hi There I am interested"
    }

    result = gql_query(query: mutation, variables: variables).
      to_h.deep_symbolize_keys.dig(:data, :createMessage)

    message = Message.first
    expect(result.dig(:message, :name)).to eq(variables["name"])
    expect(result.dig(:message, :email)).to eq(variables["email"])
    expect(result.dig(:message, :company)).to eq(variables["company"])
    expect(result.dig(:message, :message)).to eq(variables["message"])
    expect(result[:errors]).to be_blank
  end

  it "raises error for RecordInvalid" do
    variables = {
      "name" => "James Knight",
      "email" => "gr@gmail.com",
      "company" => "Coca Cola",
      "message" => "Hi There I am interested"
    }

    message = Message.new
    message.validate # missing fields makes this invalid
    allow(Message).to receive(:create!).
      and_raise(ActiveRecord::RecordInvalid.new(message))
    result = gql_query(query: mutation, variables: variables).
      to_h.deep_symbolize_keys

    expect(result[:errors]).to_not be_blank
  end

  def mutation
    <<~GQL
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
          message {
            id
            name
            email
            company
            message
          }
          success
          errors
        }
      }
    GQL
  end
end