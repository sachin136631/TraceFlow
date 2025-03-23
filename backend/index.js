import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";

const app=express();
app.use(express.json())
app.use(cors());
app.use(express.static("public"));
dotenv.config();

const port=process.env.PORT||5000;
const trackingPixels={};
const trackedEvents=[];

app.post('/generatePixel',(req,res)=>{
    const {productUrl}=req.body;
    if(!productUrl){
        return res.status(400).json({error:"product url is required"});
    }
    else{
        const pixelId=uuidv4();
        const pixelCode=`<script async src="https://yourserver.com/pixel.js?id=${pixelId}"></script>`
        trackingPixels[pixelId]={productUrl,createdAt:new Date()}
        res.json({pixelId,pixelCode});
    }
})

app.post('/trackevent',(req,res)=>{
    console.log("*********** Event Tracking Received ***********");
    console.log("Request Body:", req.body);
    const{pixelId,eventType,timestamp}=req.body;
    if(!pixelId||!eventType){
        return res.status(400).json({error:"missing pixelId or event type"});
    }
    else{
        console.log(`Event recieved ${eventType} for pixel id ${pixelId} at timestamp ${timestamp}`);
        trackedEvents.push({ pixelId, eventType, timestamp });
        res.send("success");
    }
})

app.get('/',(req,res)=>{
    res.send("backend is running");
})

app.listen(port,()=>{
    console.log(`server running on port ${port}`);
})