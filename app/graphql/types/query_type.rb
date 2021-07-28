module Types
  class QueryType < BaseObject
    # queries are just represented as fields
    # `all_messages` is automatically camelcased to `all_messages`
    field :all_messages, [MessageType], null: false

    # this method is invoked, when `all_message` fields is being resolved
    def all_messages
      Message.all
    end
  end
end