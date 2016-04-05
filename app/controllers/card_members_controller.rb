class CardMembersController < ApplicationController
  def index
    @card_members = CardMember.all.order('created_at DESC')
    respond_to do |format|
      format.json {render json: @card_members.to_json}
    end
  end

  def new

  end

  def create
    @card_member = CardMember.new( card_member_params )
    if @card_member.save
      respond_to do |format|
        format.json {render json: @card_member.to_json}
      end
    end
  end

  def show
    @card_member = CardMember.find( params[:id] )
    respond_to do |format|
      format.json {render json: @card_member.to_json}
    end
  end


  def update
    @card_member_params = CardMember.find( params[:id] )
    if @card_member.update( card_params )
      respond_to do |format|
        format.json {render json: @card_member.to_json}
      end
    end
  end

  def destroy
    @card_member = CardMember.find( params[:id] )
    if @card_member.destroy
      respond_to do |format|
        format.json {render json: {respose: "destroyed ok"}}
      end
    end
  end

  private
  def card_member_params
    params.require(:card_member).permit(:id, :user_id, :card_id )
  end  

end
