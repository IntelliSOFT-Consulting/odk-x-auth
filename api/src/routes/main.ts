import express, { Request, Response } from "express";

const router = express.Router()


router.get("/", async (req: Request, res: Response) => {
    res.statusCode = 400
    res.json({ status: "success", message:"ODK-X Auth"  })
    return
})

export default router