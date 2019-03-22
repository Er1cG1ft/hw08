# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Hw08.Repo.insert!(%Hw08.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.
alias Hw08.Repo
alias Hw08.Users.User

pwhash = Argon2.hash_pwd_salt("test")

Repo.insert!(%User{email: "admin@gmail.com", first_name: "Admin", last_name: "User", password_hash: pwhash})
Repo.insert!(%User{email: "user@gmail.com", first_name: "Demo", last_name: "User", password_hash: pwhash})