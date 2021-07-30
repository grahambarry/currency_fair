class MessageMailer < ApplicationMailer
  default from: 'developer@grahambarryux.com'

  def contact_email
    @message = params[:args]
    mail(to: 'grahambarry@live.ie', subject: 'Contact Form GBUX')
  end
end