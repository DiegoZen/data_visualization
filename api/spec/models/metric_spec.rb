require 'rails_helper'

RSpec.describe Metric, type: :model do

  describe "validations" do
    it 'validate required fields' do
      record = Metric.new
      record.name = '' # invalid state
      record.valid? # run validations
      expect(record.errors[:name]).to include("can't be blank") # check for presence of error

      record.name = 'foo' # valid state
      record.valid? # run validations
      expect(record.errors[:name]).to_not include("can't be blank") # check for absence of error

      record.value = nil # invalid state
      record.valid? # run validations
      expect(record.errors[:value]).to include("can't be blank") # check for presence of error

      record.value = 3 # valid state
      record.valid? # run validations
      expect(record.errors[:value]).to_not include("can't be blank") # check for absence of error
    end
  end
end
