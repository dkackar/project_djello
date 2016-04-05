class Card < ActiveRecord::Base

  before_create :set_priority

  belongs_to :list
  has_many :card_members, dependent: :destroy
  has_many :users, through: :card_members


  #Adds priority of new card in model 
  def set_priority
    self.priority = Card.where("list_id = ?", self.list_id).count + 1
  end
end
