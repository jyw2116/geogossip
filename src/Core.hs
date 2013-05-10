{-# LANGUAGE OverloadedStrings, DeriveGeneric #-}

module Core where
import GHC.Generics (Generic)
import Control.Applicative
import Data.Text (Text)
import qualified Data.Text as T
import Database.PostgreSQL.Simple
import Database.PostgreSQL.Simple.FromRow (field, fromRow)
import Database.PostgreSQL.Simple.ToRow (toRow)
import Database.PostgreSQL.Simple.ToField (toField)
import Data.Aeson
import qualified Data.ByteString.Lazy.Char8 as B

type Lat = Double
type Lng = Double
type LatLng = (Lat, Lng)
type Bounds = (LatLng, LatLng)  -- SW NE

data Channel = Channel { 
      channelId :: Int 
    , channelName :: Text
    -- , channelCenter :: LatLng
    , members :: [User]
    , messages :: [Message]
    } deriving (Generic, Show)

data User = User { 
      userId  :: Maybe Int 
    , userNick :: Text
    , userChannelId :: Maybe Int
    } deriving (Generic, Show)
    
data Message = Message {
      messageId :: Maybe Int
    , messageText :: Text
    , messageUserNick :: Text
    } deriving (Generic, Show)


-- JSON

instance ToJSON User where
  toJSON v = object ["id" .= userId v, "nick" .= userNick v, "channel_id" .= userChannelId v]

defconn :: IO Connection
defconn = connectPostgreSQL "host=localhost dbname=geogossip2"

-- TODO enforce uniqueness requirement

instance FromRow User where
  fromRow = User <$> field  <*> field <*> field

instance ToRow User where
  toRow (User a b c) = [toField a, toField b, toField c] 
  

{- TODO replace hard coded nulls with real calculations -}
allUsers :: Connection -> IO [User]
allUsers c = query_ c "SELECT user_id, user_nick, null from users"

createUser :: Connection -> String -> IO [User]
createUser c nick = query c "INSERT into users (user_nick) values (?) returning user_id, user_nick, null" [toField nick]

-- test
allUsersJSON :: IO ()
allUsersJSON = do
  c <- defconn
  allUsers c >>= mapM_ (B.putStrLn . encode)

{-

updateUser :: User -> IO User
updateUser u = do
    c <- conn
    [[id, nick]] <- quickQuery' c 
        "update users set user_nick = ? where user_id = ? returning user_id, user_nick" 
        [toSql $ userNick u, toSql $ userId u]
    commit c
    return $ User (fromSql id) (fromSql nick) Nothing

createMembership :: Channel -> User -> IO ()
createMembership = undefined

-- terminates any current membership of the user
terminateMembership :: User -> IO ()
terminateMembership = undefined

createMessage :: User -> Text -> IO ()
createMessage = undefined

-- get channel, for sending as JSON resource
getChannel :: Int -> IO Channel
getChannel = undefined
-}

