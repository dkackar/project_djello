class Board < ActiveRecord::Base
  
  has_many :board_memberships , dependent: :destroy

  has_many :lists , dependent: :destroy
  belongs_to :user

end
