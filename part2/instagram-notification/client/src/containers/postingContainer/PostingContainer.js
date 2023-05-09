import { useEffect, useState, useContext } from "react";
import Card from "../../components/card/Card";
import Navbar from "../../components/navbar/Navbar";
import { socket } from "../../socket";
import { Context } from "../../context";

const PostingContainer = () => {
    // 1
    const {
        state: { userName },
    } = useContext(Context);
    const [post, setPost] = useState([]);

    // 2
    useEffect(() => {
        socket.emit("userList", {});
    }, []);

    // 3
    useEffect(() => {
        function setPosting(data) {
            setPost(data);
        }
        socket.on("user-list", setPosting);
        return () => {
            socket.off("user-list", setPosting);
        };
    }, []);

    return (
        <div>
            <h2>{`Login as a ${userName}`}</h2>
            <div>
                <Navbar />
                {post.map((p) => (
                    <Card key={p.id} post={p} loginUser={userName} />
                ))}
            </div>
        </div>
    );
};

export default PostingContainer;
