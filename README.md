# Data Visualization

Data Visualization is a full-stack project made with React.js in the client and Ruby on Rails in the backend.
It's a metrics visualizator that let you post new metrics. Each metric has name, value and timestamp. You can display values in the last day/hour/minute and it calculates the average value for that interval.
The backend was developed using test-driven development (TDD)

## Prerequisites
First, check if you have everything installed
```bash
ruby -v
rails -v
sqlite3 —version
node —v
yarn -v
```
This project has been built with:
- ruby 2.7
- Rails 6.0.3.2
- SQLite 3.24.0
- node v12.14.0
- yarn 1.22.5


## Installation

For the API, install the gems

```bash
cd api/
bundle install
```

For the client, install the dependencies
```bash
cd frontend/
yarn install
```

## Usage

### Rails server:
In api/ directory, make the migrations and run the server
```bash
rails db:migrate
rails server
```
It is the same endpoint for POST and GET requests

To run tests
```bash
bundle exec rspec
```

### React client
In frontend/ directory, run the server
```bash
yarn start
```

## License
[MIT](https://choosealicense.com/licenses/mit/)