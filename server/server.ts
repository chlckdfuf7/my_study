import express, { Request, Response } from "express";
import multer from "multer";
import path from "path";
import cors from "cors";
import fs from "fs";

const app = express();
app.use(cors());
app.use(express.json());
const PORT = 5000;

const DATA_FILE = path.join(__dirname, "../resources/tempData/postData.json");

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
const readDataFile = (): any[] => {
    const data = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(data);
};

// JSON 파일 쓰기 유틸리티
const writeDataFile = (data: any[]): void => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
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

// 정적 파일 경로 설정
app.use("/resources", express.static(path.join(__dirname, "../resources"))); // /resources 경로로 정적 파일 서빙

app.listen(PORT, () => {
    console.log(`서버가 http://localhost:${PORT}에서 실행 중입니다.`);
});
