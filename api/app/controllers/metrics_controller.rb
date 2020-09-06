class MetricsController < ApplicationController

    rescue_from Exception do |e|
        render json: {error: e.message}, status: :internal_error
    end

    rescue_from ActiveRecord::RecordInvalid do |e|
        render json: {error: e.message}, status: :unprocessable_entity
    end


    # GET /metrics
    def index
        @metrics = Metric.all

        if !params[:search].nil? && params[:search].present?
            @metrics = MetricSearchService.search(@metrics, params[:search])
        end

        render json: @metrics, status: :ok
    end

    # GET /metrics/{id}
    def show
        @metric = Metric.find(params[:id])
        render json: @metric, status: :ok
    end

    # POST /metrics
    def create
        @metric = Metric.create!(create_params)
        render json: @metric, status: :created
    end


    private
    def create_params
        params.require(:metric).permit(:name, :value)
    end
end