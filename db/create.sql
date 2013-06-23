
create table channels (
  channel_id serial primary key,
  created timestamp with time zone default now(),
  channel_title varchar not null,
  lat float,
  lng float,
  updated timestamp default now()
);

create table users (
  user_id serial primary key,
  user_nick varchar unique,
  user_agent varchar,
  created timestamp with time zone default now()
);

-- channel membership is transient; this acts as a log as well
create table membership (
  membership_id serial primary key,
  user_id integer references users (user_id) on delete cascade,
  channel_id integer references channels(channel_id) on delete cascade, 
  created timestamp with time zone default now(),
  terminated timestamp with time zone default null 
);

create table messages (
  message_id serial primary key,
  channel_id integer references channels (channel_id) on delete cascade,
  user_id integer references users (user_id) on delete cascade,
  user_nick varchar not null, -- a historical log of the user nick at the time
  message_content text not null,
  created timestamp with time zone default now()
);
create index messages_channel_idx on messages (channel_id);
create index messages_user_idx on messages (user_id);

