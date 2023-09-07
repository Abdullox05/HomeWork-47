create database home_work_47;

create table users(
  id serial primary key,
  user_name varchar(64) not null,
  password varchar(60) not null,
  balance float not null default 1000,
  created_at timestamp without time zone default now()
);

create table services(
  id serial primary key,
  title varchar(64) not null,
  description varchar(128) not null,
  price float not null,
  owner_id int not null,
  created_at timestamp without time zone default current_timestamp,
  foreign key (owner_id) references users(id) on delete cascade
);

create table transactions(
  id serial primary key,
  from_id int not null,
  to_id int not null,
  quantity float not null,
  created_at timestamp without time zone default current_timestamp,
  foreign key (from_id) references users(id) on delete cascade,
  foreign key (to_id) references services(id) on delete cascade
);