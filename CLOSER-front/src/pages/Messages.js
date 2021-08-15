import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { StreamChat } from 'stream-chat';
import { Chat, Channel, ChannelHeader, ChannelList, LoadingIndicator, MessageInput, MessageList, Thread, Window } from 'stream-chat-react';
import 'stream-chat-react/dist/css/index.css';
import './Messages.css'

const Messages = () => {

    const { userInfo } = useSelector((state) => (state.user))
    const user_id = userInfo.userId;
    const userToken = userInfo.chattoken;
    const filters = { type: 'messaging', members: { $in: [user_id] } };
    const sort = { last_message_at: -1 };

    // Define values.
    const api_key = '5gan2md896h2'
    const api_secret = 'khjmr5fft6getdd9a4ww9c7y4f5pgmuq436sqrv9hjcn6ehsssxa5uj4x8229w5r'

// Initialize a Server Client
    const serverClient = StreamChat.getInstance(api_key, api_secret);
// Create User Token
    const token = serverClient.createToken(user_id);
    console.log(token)

  const [chatClient, setChatClient] = useState(null);

  useEffect(() => {
    const initChat = async () => {
      const client = StreamChat.getInstance('5gan2md896h2');

      await client.connectUser(
          {
            id: user_id,
            name: userInfo.nickname,
            image: 'https://getstream.io/random_png/?id=still-thunder-3&name=still-thunder-3',
          },
          token,
      );
      setChatClient(client);
    };

    initChat();
  }, []);

  if (!chatClient) {
    return <LoadingIndicator />;
  }

  return (
      <Chat client={chatClient} theme='messaging light'>
        <ChannelList filters={filters} sort={sort} />
        <Channel>
          <Window>
            <ChannelHeader/>
            <MessageList />
            <MessageInput />
          </Window>
          <Thread />
        </Channel>
      </Chat>
  );
};
export default Messages;