require "rails_helper"

RSpec.describe "Metrics", type: :request do
    describe "GET /metrics" do
        before { get '/metrics'}
        it "should return OK" do
            
            payload = JSON.parse(response.body)
            expect(payload).to be_empty
            expect(response).to have_http_status(200)
        end

        describe "Search" do
            let!(:var1) { create(:metric, name: "var1")}
            let!(:var2) { create(:metric, name: "var2")}
            let!(:var3) { create(:metric, name: "var3")}

            it "should filter metrics by name" do
                get '/metrics?search=var1'
                payload = JSON.parse(response.body)
                expect(payload).to_not be_empty
                expect(payload.size).to eq(1)
                expect(payload.map {|p| p["id"]}).to eq([var1.id])
                expect(response).to have_http_status(200)
            end
        end
    end
        
    describe "with data in the DB" do
        let!(:metrics) { create_list(:metric, 10)}
        before { get '/metrics'}
        it "should return all the metrics" do
            payload = JSON.parse(response.body)
            expect(payload.size).to eq(metrics.size)
            expect(response).to have_http_status(200)
        end
    end

    describe "GET /metrics/{id}" do
        let!(:metric) { create(:metric)}
        it "should return a metric" do
            get "/metrics/#{metric.id}"
            payload = JSON.parse(response.body)
            expect(payload).to_not be_empty
            expect(payload["id"]).to eq(metric.id)
            expect(payload["name"]).to eq(metric.name)
            expect(payload["value"]).to eq(metric.value)

            expect(response).to have_http_status(200)
        end
    end

    describe "POST /metrics" do
        it "should create a metric" do
            req_payload = {
                metric: {
                    name: "test",
                    value: 2.5
                }
            }

            # POST HTTP
            post "/metrics", params: req_payload
            payload = JSON.parse(response.body)
            expect(payload).to_not be_empty
            expect(payload["id"]).to_not be_nil
            expect(response).to have_http_status(:created)
        end

        it "should return error message on invalid metric" do
            req_payload = {
                metric: {
                    value: 2.5
                }
            }

            # POST HTTP
            post "/metrics", params: req_payload
            payload = JSON.parse(response.body)
            expect(payload).to_not be_empty
            expect(payload["error"]).to_not be_empty
            expect(response).to have_http_status(:unprocessable_entity)
        end
    end

end