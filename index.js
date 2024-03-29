import express from "express"
import ytdl from 'ytdl-core'
import path from 'path'
import cors from 'cors'
const app = express()
const port = process.env.PORT || "3000"
const __dirname = path.dirname(new URL(import.meta.url).pathname);
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'html');
app.use(cors())
app.options('*', cors());

app.get('/', async (req, res) => {
res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

// For handling Video Download req
app.post('/api/video',async (req, res) => {
    let videos=[]
    let {url}=req.body
    // console.log(url)
    let check =ytdl.validateURL(url)
    if (!check) {
        console.log("Invalid URL")
        
        res.json(0)
        return 
    } 
    let id = ytdl.getVideoID(url)
    let info = await ytdl.getInfo(id)
    let formats =info.formats

    for (let i = 0; i < formats.length; i++) {
        if(formats[i].itag==18){
            // console.log(formats[i]);
            videos.push(formats[i])
        }
        if(formats[i].itag==135){
            // console.log(formats[i]);
            videos.push(formats[i])
        }
        if(formats[i].itag==136){
            // console.log(formats[i]);
            videos.push(formats[i])
        }
        if(formats[i].itag==137){
            // console.log(formats[i]);
            videos.push(formats[i])
        }
        
    }
   console.log("Success")
   res.json(videos)
})

// For handling Audio Download req
app.post('/api/audio', async(req, res) => {
    let {url}=req.body
    // console.log(url)
    let videos=[]
    console.log("HELLO")
    let check =ytdl.validateURL(url)
    if (!check) {
        console.log("Invalid URL")
        res.json(0)
        return 
        
    } 
    let id = ytdl.getVideoID(url)
    let info = await ytdl.getInfo(id)
    let audioFormats = ytdl.filterFormats(info.formats, 'audioonly');
    
    console.log("Success")
    res.json(audioFormats)
})

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})  
