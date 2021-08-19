import React ,{useEffect,useState}from 'react';
import { useSelector } from 'react-redux';
import { StreamChat } from 'stream-chat';
import { Chat, Channel, ChannelHeader, ChannelList, MessageInput, MessageList, Thread, Window } from 'stream-chat-react';
import 'stream-chat-react/dist/css/index.css';
import './Messages.css';
import '../../styles/theme.css'
import axios from "axios";

const GroupMessages = ({match}) => {
    const channelID = match.params.board_pk
    const { userInfo } = useSelector((state) => (state.user))
    const user_id = userInfo.userId;
    const userToken = userInfo.chattoken;
    const filters = { type: 'messaging', members: { $in: [user_id] } };
    const sort = { last_message_at: -1 };
    const client = StreamChat.getInstance('5gan2md896h2');
    const [title,setTitle] = useState("");
    useEffect(()=>{
        axios.get(`http://localhost:8080/board/${channelID}`)
            .then((res)=>{
                setTitle(res.data.title)
            })
            .catch((err) => {
                console.log(err)
            })
    })

    client.connectUser(
        {
            id: user_id,
            name: userInfo.nickname,
        },
        userToken,
    );
    const channel = client.channel('messaging', channelID,{
        name: title,
    });


    return (
        <>
            <div className="white-square" ></div>
            <Chat client={client} theme='messaging light'>
                <ChannelList filters={filters} sort={sort} />
                <Channel channel={channel}>
                    <Window>
                        <ChannelHeader/>
                        <MessageList />
                        <MessageInput />
                    </Window>
                    <Thread />
                </Channel>
            </Chat>
        </>
    );
};
export default GroupMessages;