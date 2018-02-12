<!-- Structure of DataBase


# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
# chat-space
 -->

## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|id|integer|null: false|
|name|string|null: false|
|email|string|null: false|
|password|string||

### Association
- has_many :groups
- has_many :messages
- belongs_to :groups

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|id|integer|null: false|
|group_name|string|null: false, foreign_key: true|
|chat_member|string|null: false, foreign_key: true|

### Association
- has_many :users
- belongs_to :user

## messageテーブル

|Column|Type|Options|
|------|----|-------|
|id|integer|null: false|
|message|string|null: false, foreign_key: true|
|image|string|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user
