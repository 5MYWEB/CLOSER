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
          userToken,
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