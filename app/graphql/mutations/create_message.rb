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
      message = Message.create!(args)

      MutationResult.call(
        obj: { message: message },
        success: message.persisted?,
        errors: message.errors
      )
    rescue ActiveRecord::RecordInvalid => invalid
      GraphQL::ExecutionError.new(
        "Invalid Attributes for #{invalid.record.class.name}: " \
        "#{invalid.record.errors.full_messages.join(', ')}"
      )
    end
  end
end
