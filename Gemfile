# frozen_string_literal: true

source "https://rubygems.org"
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby File.read("./.ruby-version").strip
gem 'mimemagic', github: 'mimemagicrb/mimemagic', ref: '01f92d86d15d85cfd0f20dabd025dcbd36a8a60f'
gem "bootsnap", ">= 1.1.0", require: false
gem "coffee-rails", "~> 4.2"
gem "devise"
gem "devise-token_authenticatable"
gem "foreman"
gem "graphql"
gem "jbuilder", "~> 2.5"
gem "pg"
gem "puma", "~> 3.11"
gem "rails", "5.2.3"
gem "sass-rails", "~> 5.0"
gem "sprockets", "~> 3.7.2" # version 3.7.1 has a known vulnerability
gem "turbolinks", "~> 5"
gem "uglifier", ">= 1.3.0"
gem "webpacker", "~> 4.0.7"

group :development do
  gem "graphiql-rails"
  gem "listen", ">= 3.0.5", "< 3.2"
  gem "pry"
  gem "pry-nav"
  gem "spring"
  gem "spring-watcher-listen", "~> 2.0.0"
  gem "web-console", ">= 3.3.0"
end

group :test do
  gem "capybara", ">= 2.15"
  gem "factory_bot_rails"
  gem "rspec-rails"
  gem "selenium-webdriver"
end

gem 'graphiql-rails', group: :development