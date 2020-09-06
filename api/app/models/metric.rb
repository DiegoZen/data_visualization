class Metric < ApplicationRecord
    validates :name, :value, :presence => true
end
