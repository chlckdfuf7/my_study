import express, { Request, Response } from "express";
import multer from "multer";
import path from "path";
import cors from "cors";
import fs from "fs";
import { error } from "console";

const app = express();
app.use(cors());
app.use(express.json());
const PORT = 5000;

const DATA_FILE = path.join(__dirname, "../resources/tempData/postData.json");
const USER_DATA_FILE = path.join(__dirname, "../resources/userData/userData.json");

// Multer 설정
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../resources/blogPost")); // 업로드 디렉토리 설정
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // 파일 이름 설정
    },
});
const upload = multer({ storage });

// JSON 파일 읽기 유틸리티
const readDataFile = (type?: string): any[] => {
    let data_file = DATA_FILE;
    if (type === "user") {
        data_file = USER_DATA_FILE;
    }
    const data = fs.readFileSync(data_file, "utf-8");
    return JSON.parse(data);
};

// JSON 파일 쓰기 유틸리티
const writeDataFile = (data: any[], type?: string): void => {
    let data_file = DATA_FILE;
    if (type === "user") {
        data_file = USER_DATA_FILE;
    }
    fs.writeFileSync(data_file, JSON.stringify(data, null, 2), "utf-8");
};

// 데이터 읽기 API
app.get("/posts", (req: Request, res: Response) => {
    try {
        res.status(200).json(readDataFile());
    } catch (error) {
        console.error("데이터 파일 읽기 실패:", error);
        res.status(500).send("데이터 로드 실패");
    }
});

// 댓글 추가 API
app.post("/posts/:postId/replies", (req: Request, res: Response) => {
    try {
        const postId = parseInt(req.params.postId, 10);
        const newReply = req.body; // 클라이언트에서 전송된 새 댓글
        const posts = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));

        // 해당 게시글 찾기
        const post = posts.find((p: any) => p.postId === postId);
        if (!post) {
            return res.status(404).send("게시글을 찾을 수 없습니다.");
        }

        // 댓글 추가
        post.reply.push(newReply);

        // 데이터 파일 업데이트
        fs.writeFileSync(DATA_FILE, JSON.stringify(posts, null, 2));

        res.status(201).json(post); // 업데이트된 게시글 반환
    } catch (error) {
        console.error("댓글 추가 중 오류:", error);
        res.status(500).send("댓글 추가 실패");
    }
});

// 새로운 게시글 추가 API
app.post("/posts", (req: Request, res: Response) => {
    try {
        const newPost = req.body; // 클라이언트에서 전송된 새 게시글
        const posts = readDataFile();

        // 새로운 게시글 ID 설정
        const lastId = posts.length > 0 ? Math.max(...posts.map((post) => post.postId)) : 0;
        newPost.postId = lastId + 1;

        // 게시글 추가
        posts.push(newPost);
        writeDataFile(posts);

        res.status(201).send({ message: "게시글이 추가되었습니다.", newPost });
    } catch (error) {
        console.error("게시글 추가 중 오류:", error);
        res.status(500).send("서버 오류로 게시글 추가 실패.");
    }
});

// 업로드 API
app.post("/upload", upload.single("file"), (req: Request, res: Response) => {
    console.log("파일 업로드 요청: ", req.file);
    try {
        res.status(200).send("파일 업로드 성공!");
    } catch (error) {
        console.error("파일 업로드 실패: ", error);
        res.status(500).send("파일 업로드 실패!");
    }
});

// UserData 가져오는 API
app.get("/userInfo/:userId", (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const users = readDataFile("user");

        // 해당 userInfo 찾기
        const user = users.find((user) => user.userId === userId);
        if (!user) {
            return res.status(404).send("해당 유저를 찾을 수 없습니다.");
        }

        res.status(200).json(user);
    } catch (error) {
        console.log("유저 정보 찾기 중 오류: ", error);
        res.status(500).send("유저 정보 찾기 실패");
    }
});

// 게시글 삭제 
app.post("/deletePost/:postId", (req: Request, res: Response) => {
    try {
        const postId = parseInt(req.params.postId);
        const users = readDataFile("user");
        users.map((user) => {
            if (user.heart.includes(postId)) {
                user.heart.splice(postId, 1);
            }
            if (user.bookmark.includes(postId)) {
                user.bookmark.splice(postId, 1);
            }
        });
        writeDataFile(users, "user");

        const posts = readDataFile();
        const deletePostIndex = posts.findIndex(post => post.postId === postId);
        if (deletePostIndex !== -1) {
            posts.splice(deletePostIndex, 1);
            writeDataFile(posts);
            res.status(201).json(posts);
        } else {
            res.status(404).send("게시글을 찾을 수 없습니다.");
        }
    } catch (error) {
        console.log("게시글 삭제 업데이트 중 오류: ", error);
        res.status(500).send("게시글 삭제 업데이트 실패");
    }
});

// 좋아요 버튼 클릭 api
app.post("/heart/:isIncrease/:postId/:userId", (req: Request, res: Response) => {
    try {
        const isIncrease = req.params.isIncrease ? JSON.parse(req.params.isIncrease.toLowerCase()) : false;
        const users = readDataFile("user");
        const userId = req.params.userId;
        const postId = parseInt(req.params.postId);
        const user = users.find(item => item.userId === userId);
        if (!user) {
            console.log("존재하지 않는 사용자입니다.");
            return res.status(404).send("존재하지 않는 사용자입니다.");
        }
        if (isIncrease) {
            user.heart.push(postId);
        } else {
            user.heart = user.heart.filter((id: number) => id !== postId);
        }
        writeDataFile(users, "user");
        const diff = isIncrease ? 1 : -1;
    
        const posts = readDataFile();
        const post = posts.find(item => item.postId === postId);
        if (!post) {
            console.log("존재하지 않는 게시글입니다.");
            return res.status(404).send("존재하지 않는 게시글입니다.");
        }
        post.heart += diff;
        writeDataFile(posts);
        res.status(200).json(posts);
    } catch (error) {
        console.log("좋아요 버튼 중 오류: ", error);
        res.status(500).send("좋아요 버튼 실패");
    }
});

// 북마크 버튼 클릭 api
app.post("/changeBookmark/:userId/:postId/:isAdd", (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const postId = parseInt(req.params.postId);
        const isAdd = req.params.isAdd ? JSON.parse(req.params.isAdd.toLowerCase()) : false;
        const users = readDataFile("user");
        const user = users.find(item => item.userId === userId);
        if (!user) {
            console.log("유효하지 않은 사용자입니다.");
            return res.status(404).send("유효하지 않은 사용자입니다.");
        }
        if (isAdd) {
            user.bookmark.push(postId);
        } else {
            user.bookmark = user.bookmark.filter((item: number) => item !== postId);
        }
        writeDataFile(users, "user");
        res.status(200).send("북마크 변경 성공!");
    } catch (error) {
        console.log("북마크 처리 중 오류: ", error);
        res.status(500).send("북마크 버튼 실패");
    }
});

app.post("/updateNavigate/:userId", (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const newFavorites = req.body;
        if (!Array.isArray(newFavorites)) {
            return res.status(400).json({ error: "전달된 데이터가 배열이 아닙니다." });
        }
        const users = readDataFile("user");
        const user = users.find(item => item.userId === userId);
        if (!user) {
            console.log("유효하지 않은 사용자입니다.");
            return res.status(404).send("유효하지 않은 사용자입니다.");
        }
        user.favorites = newFavorites;
        writeDataFile(users, "user");
        res.status(200).send("즐겨찾기 업데이트 완료");
    } catch (error) {
        console.log("즐겨찾기 업데이트 중 오류: ", error);
        res.status(500).send("즐겨찾기 업데이트 실패");
    }
});

// 정적 파일 경로 설정
app.use("/resources", express.static(path.join(__dirname, "../resources"))); // /resources 경로로 정적 파일 서빙

app.listen(PORT, () => {
    console.log(`서버가 http://localhost:${PORT}에서 실행 중입니다.`);
});
