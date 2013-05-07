{-# LANGUAGE OverloadedStrings, DeriveGeneric #-}

module Core where
import GHC.Generics (Generic)
import Data.Text (Text)
import qualified Data.Text as T

import Database.HDBC
import Database.HDBC.PostgreSQL

type Lat = Double
type Lng = Double
type LatLng = (Lat, Lng)
type Bounds = (LatLng, LatLng)  -- SW NE

data Channel = Channel { 
      channelId :: Int 
    , channelCenter :: LatLng
    , members :: [User]
    , messages :: [Message]
    } deriving (Generic, Show)

data User = User { 
      userId  :: Int 
    , userNick :: Text
    , userChannelId :: Maybe Int
    } deriving (Generic, Show)
    
data Message = Message {
      messageId :: Int
    , messageText :: Text
    , messageUserNick :: Text
    }

conn :: IO Connection
conn = connectPostgreSQL "host=localhost dbname=geogossip2"

 
