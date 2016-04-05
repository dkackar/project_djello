class CardsController < ApplicationController

  def index
    @cards = Card.all.order('created_at DESC')
    respond_to do |format|
      format.json {render json: @card.to_json}
    end
  end

  def new

  end

  def create
    @card = Card.new( card_params )
    if @card.save
      puts "Card is #{@card.id}  and #{@card.title}"
      respond_to do |format|
        format.json {render json: @card.to_json}
      end
    end
  end

  def show
    @card = Card.find( params[:id] )
    respond_to do |format|
      format.json {render json: @card.to_json}
    end
  end


  def update
    @card_params = Card.find( params[:id] )
    if @card.update( card_params )
      respond_to do |format|
        format.json {render json: @card.to_json}
      end
    end
  end

  def destroy
    @card = Card.find( params[:id] )
    if @card.destroy
      respond_to do |format|
        format.json {render json: {respose: "destroyed ok"}}
      end
    end
  end

  private
  def card_params
    params.require(:card).permit(:id, :title, :description, :list_id, :completed )
  end  

end