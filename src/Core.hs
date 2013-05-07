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
    } deriving (Generic, Show)

conn :: IO Connection
conn = connectPostgreSQL "host=localhost dbname=geogossip2"

-- TODO enforce uniqueness requirement

createUser :: String -> IO User
createUser nick = do
    c <- conn
    [[id, nick]] <- quickQuery' c "insert into users (user_nick) values (?) returning user_id, user_nick" [toSql nick]
    commit c
    return $ User (fromSql id) (fromSql nick) Nothing

updateUser :: User -> IO User
updateUser u = do
    c <- conn
    [[id, nick]] <- quickQuery' c 
        "update users set user_nick = ? where user_id = ? returning user_id, user_nick" 
        [toSql $ userNick u, toSql $ userId u]
    commit c
    return $ User (fromSql id) (fromSql nick) Nothing
  
