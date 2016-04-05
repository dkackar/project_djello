class ListsController < ApplicationController

  def index
    @lists = List.all.order('created_at DESC')
    respond_to do |format|
      format.json {render json: @lists.to_json(include: :cards)}
    end
  end

  def new

  end

  def create
    @list = List.new( list_params )
    if @list.save
      respond_to do |format|
        format.json {render json: @list.to_json(include: :cards)}
      end
    end
  end

  def show
    @list = List.find( params[:id] )
    respond_to do |format|
      format.json {render json: @list.to_json(include: :cards)}
    end
  end

  def update
    @list = List.find( params[:id] )
    puts "Found #{@list}"
    if @list.update( list_params )
      respond_to do |format|
        format.json {render json: @list.to_json(include: :cards)}
      end
    end
  end

  def destroy
    @list = List.find( params[:id] )
    if @list.destroy
      respond_to do |format|
        format.json {render json: {respose: "destroyed ok"}}
      end
    end
  end

  private
  def list_params
    params.require(:list).permit(:id, :title, :description, :board_id )
  end  

end