class MessageMailer < ApplicationMailer
  default from: 'developer@grahambarryux.com'

  def contact_email

    @message = params[:args]
    puts "#{@message} <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<MESSAGE MESSAGE MASSAGE"
    # @url  = 'http://example.com/login'
    mail(to: @message[:email], subject: 'Test Email')
  end
end