import React ,{useState, useEffect}from 'react';
import { useSelector } from 'react-redux';
import { StreamChat } from 'stream-chat';
import { Chat, Channel, ChannelHeader, ChannelList, MessageInput, MessageList, Thread, Window } from 'stream-chat-react';
import 'stream-chat-react/dist/css/index.css';
import './Messages.css'
import axios from "axios";

const OtherMessages = ({match}) => {
    
    const other_id = match.params.id;
    const { userInfo } = useSelector((state) => (state.user))
    const user_id = userInfo.userId;
    const userToken = userInfo.chattoken;
    const filters = { type: 'messaging', members: { $in: [user_id] } };
    const sort = { last_message_at: -1 };
    const client = StreamChat.getInstance('5gan2md896h2');
    const [nickname,setNickname] = useState("");

    useEffect(()=>{
        axios.post(`http://localhost:8080/user/profileinfo?userId=${other_id}`)
            .then((res) => {
                setNickname(res.data.nickname)
            })
            .catch((err) => {
                console.log(err)
            })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    client.connectUser(
        {
            id: user_id,
            name: userInfo.nickname,
        },
        userToken,
    );

    useEffect( ()=>{
        async function hoyeong () {if(nickname!=="") {
            console.log(`nickname: ${nickname}`)
            const channel = await client.channel('messaging', {
                name: `${userInfo.nickname}와 ${nickname}의 대화`,
                members: [user_id, other_id],
            });
            channel.create();
            channel.watch();
        }}
        hoyeong()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[nickname])


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
export default OtherMessages;