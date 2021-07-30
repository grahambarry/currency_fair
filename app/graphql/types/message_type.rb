module Types
  class MessageType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :email, String, null: false
    field :company, String, null: false
    field :message, String, null: false
  end
end
