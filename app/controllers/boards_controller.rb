class BoardsController < ApplicationController

  def index
    puts "Here user id is #{current_user.id}"
    @boards = Board.all.order('created_at DESC').where("user_id = ?" ,current_user.id)
    respond_to do |format|
      #format.json {render json: @boards.to_json(include: :lists)}
      #format.json {render json: @boards.to_json(:include => {:lists => {:include => :cards}})}
      format.json {render json: @boards.to_json(:include => {:lists => {:include => :cards}})}
    end
  end

  def new

  end

  def create
    @board = Board.new( board_params )
    if @board.save
      respond_to do |format|
        puts "Board is #{@board.id}"
        format.json {render json: @board.to_json(include: :lists)}
      end
    end
  end

  def show
    @board = Board.find( params[:id] )
    respond_to do |format|
      format.json {render json: @board.to_json(include: :lists)}
    end
  end


  def update
    @board = Board.find( params[:id] )
    if @board.update( board_params )
      respond_to do |format|
        format.json {render json: @board.to_json(include: :lists)}
      end
    end
  end

  def destroy
    @board = Board.find( params[:id] )
    if @board.destroy
      respond_to do |format|
        format.json {render json: {respose: "destroyed ok"}}
      end
    end
  end

  private
  def board_params
    params.require(:board).permit(:id, :title, :user_id )
  end  

end
