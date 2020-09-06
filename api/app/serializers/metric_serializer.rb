class MetricSerializer < ActiveModel::Serializer
  attributes :id, :name, :value, :created_at
end
