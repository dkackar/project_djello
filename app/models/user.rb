class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :board_memberships , dependent: :destroy
  has_many :boards, :through => :board_memberships , dependent: :destroy

  #has_many :card_memberships, :through => :board_memberships , dependent: :destroy
  has_many :card_members, dependent: :destroy
  has_many :cards, :through => :card_members


  has_many :boards , dependent: :destroy

  has_many :lists, :through => :boards


end

