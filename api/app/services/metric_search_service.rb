class MetricSearchService
    def self.search(curr_metrics, query)
        curr_metrics.where("name like '%#{query}%'")
    end
end