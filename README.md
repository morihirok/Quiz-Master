# Quiz Master

## Getting Started

### Prerequisites

- Ruby 2.5.1

### Installing

- Install gems & npm packages

```
$ bundle install --path vendor/bundle --jobs=4
$ yarn install
```

- Create database & insert test data

```
$ bundle exec rails db:create
$ bundle exec rails db:migrate
$ bundle exec rails db:seed
```

- Start running on localhost

```
$ bundle exec foreman start
```

- Access `localhost:5000`
