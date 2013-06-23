require 'active_record'
require 'sinatra'
require 'json'

class User < ActiveRecord::Base
  self.primary_key = "user_id"
  has_many :messages
  has_many :memberships
end
class Message < ActiveRecord::Base
  self.primary_key = "message_id"
  belongs_to :user
end
class Channel < ActiveRecord::Base
  self.primary_key = "channel_id"
  has_many :memberships
  has_many :users, :through => :memberships
end
class Membership < ActiveRecord::Base
  self.primary_key = "membership_id"
  belongs_to :user
  belongs_to :channel
end

ActiveRecord::Base.establish_connection(
  host: "localhost",
  adapter: "postgresql",
  database: "geogossip"
)

ActiveRecord::Base.include_root_in_json = false

get '/' do
  form = <<-END
    <form action="/messages" method="POST">
      <input type="text" name="name"/>
      <input type="submit"/>
    </form>
  END
end

get '/channels' do
  Channel.all.map {|channel|
    channel.attributes.merge(
      users: channel.users
    )
  }.to_json
end
