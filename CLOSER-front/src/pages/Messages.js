import React, { useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat';
import { Chat, Channel, ChannelHeader, ChannelList, LoadingIndicator, MessageInput, MessageList, Thread, Window } from 'stream-chat-react';
import 'stream-chat-react/dist/css/index.css';

const user_id = 'ssafy';
const chatClient = StreamChat.getInstance('5gan2md896h2');
const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoic3NhZnkifQ.wO8ihnakCPswEk5NqdeiODWFnTMOb27Ktz-RrL8i-Vk';

chatClient.connectUser(
    {
      id: user_id,
      name: 'user',
      image: 'https://getstream.io/random_png/?id=still-thunder-3&name=still-thunder-3',
    },
    userToken,
);

//const channel = chatClient.channel('messaging', 'ssafy1');
// const remove = channel.removeMembers([user_id]);

const filters = { type: 'messaging', members: { $in: [user_id] } };
const sort = { last_message_at: -1 };

const Messages = () => {
  const [chatClient, setChatClient] = useState(null);

  useEffect(() => {
    const initChat = async () => {
      const client = StreamChat.getInstance('5gan2md896h2');

      await client.connectUser(
          {
            id: user_id,
            name: 'user',
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
        <ChannelList filters={filters} sort={sort}/>
        <Channel>
          <Window>
            <ChannelHeader />
            <MessageList />
            <MessageInput />
          </Window>
          <Thread />
        </Channel>
      </Chat>
  );
};
export default Messages;