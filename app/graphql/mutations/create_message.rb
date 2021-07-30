module Mutations
  class CreateMessage < Mutations::BaseMutation
    graphql_name "CreateMessage"
    # arguments passed to the `resolve` method
    argument :name, String, required: true
    argument :email, String, required: true
    argument :company, String, required: true
    argument :message, String, required: true
    # return type from the mutation
    field :message, Types::MessageType, null: false
    def resolve(args)
      message = MessageMailer.with(args: args).contact_email.deliver_now
      MutationResult.call(
        errors: message.errors
      )
    end
  end
end
