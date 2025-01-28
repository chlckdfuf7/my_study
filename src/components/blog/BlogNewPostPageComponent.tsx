import React, { useContext, useState } from "react";
import { BlogContext } from "../../context/BlogContext";
import { BlogPost } from "../../context/BlogTypes";
import useStore from "../../hooks/useStore";

const BlogNewPostPageComponent: React.FC = () => {
    const {state, dispatch} = useContext(BlogContext);
    const [ fileName, setFileName ] = useState<string>("파일을 선택해주세요");
    const [ file, setFile ] = useState<File | null>(null);
    const [ title, setTitle ] = useState<string>("");
    const [ contents, setContents ] = useState<string>("");
    const { userStore } = useStore();
    const data = state.data;

    const handleRegister = async () => {
        if (!file || !title || !contents) {
            alert("모든 정보를 입력해주세요.");
            return;
        }

        const newPost: BlogPost = {
            postId: 0,
            author: userStore.getUserName(),
            title: title,
            img: fileName,
            hearts: 0,
            contents: contents,
            bookmark: false,
            reply: [],
        };

        try {
            // 서버로 데이터 전송
            const response = await fetch("http://localhost:5000/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newPost),
            });
    
            if (response.ok) {
                const result = await response.json();
                console.log("서버 응답:", result);
    
                // 서버에서 받아온 데이터를 state에 추가
                dispatch({ type: "SET_DATA", payload: [...data, result.newPost] });
                dispatch({ type: "SET_NEW_POST", payload: false });
            } else {
                alert("게시글 등록 실패!");
            }
        } catch (error) {
            console.error("게시글 등록 중 오류:", error);
            alert("서버와의 통신 중 오류가 발생했습니다.");
        }
    };

    const handleCancel = () => {
        dispatch({ type: "SET_NEW_POST", payload: false });
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const file = e.target.files?.[0];
        if (file) {
            setFileName(file.name);
            setFile(file);
            const formData = new FormData();
            formData.append("file", file);

            try {
                const response = await fetch("http://localhost:5000/upload", {
                    method: "POST",
                    body: formData,
                });

                if (response.ok) {
                    console.log("파일 업로드 성공");
                }
            } catch (error) {
                alert("파일 업로드 실패.");
            }
        }
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const fileInput = document.getElementById("file-upload");
        if (fileInput) {
            fileInput.click();
        }
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleContentsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContents(e.target.value);
    }
    
    return (
        <>
            <div style={{ paddingBottom:"10px", borderBottom:"0.5px dashed" }}>
                <label htmlFor="title" style={{ marginRight:"10px"}}>제목: </label>
                <input type="text" placeholder="제목을 입력해주세요" onChange={handleTitleChange} value={title} />
            </div>
            <div style={{ display:"flex", alignItems:"center", gap: "10px", borderBottom: "0.5px dashed", paddingBottom:"10px" }}>
                <label>파일: </label>
                <div style={{ border:"0.5px solid", borderRadius:"10px" }}>{fileName}</div>
                <input id="file-upload" type="file" style={{ display: "none" }} onChange={handleFileChange} />
                <button type="button" onClick={handleClick}>파일 찾기</button>
            </div>
            <div style={{ display:"flex", flexDirection:"row"}}>
                <span style={{ marginRight:"10px"}}>내용: </span>
                <textarea style={{ width:"95%", height:"180px", overflowY:"auto", borderRadius:"5px", fontSize:"14px", lineHeight:"1.5", padding:"10px" }} placeholder="내용을 입력해주세요" onChange={handleContentsChange} value={contents} />
            </div>
            <div style={{ display:"flex", flexDirection:"row", justifyContent:"center", gap:"10px"}}>
                <button style={{ width: "100px", height:"50px"}} onClick={handleRegister}>게시</button>
                <button style={{ width: "100px", height:"50px"}} onClick={handleCancel}>취소</button>
            </div>
        </>
    );
};

export default BlogNewPostPageComponent;