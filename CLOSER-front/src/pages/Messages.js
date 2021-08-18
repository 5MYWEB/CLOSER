import React from 'react';
import { useSelector } from 'react-redux';
import { StreamChat } from 'stream-chat';
import { Chat, Channel, ChannelHeader, ChannelList, MessageInput, MessageList, Thread, Window } from 'stream-chat-react';
import 'stream-chat-react/dist/css/index.css';
import './Messages.css'

const Messages = () => {

    const { userInfo, isLoggedIn } = useSelector((state) => (state.user))
    const user_id = userInfo.userId;
    const userToken = userInfo.chattoken;
    const filters = { type: 'messaging', members: { $in: [user_id] } };
    const sort = { last_message_at: -1 };
    const client = StreamChat.getInstance('5gan2md896h2');
    if (isLoggedIn === true){
        client.connectUser(
            {
                id: user_id,
                name: userInfo.nickname,
            },
            userToken,
        );
    }

    return (
        <Chat client={client} theme='messaging light'>
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