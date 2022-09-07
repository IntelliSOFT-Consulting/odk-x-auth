import express, { Request, Response } from "express";
import { requireJWTMiddleware as requireJWT, encodeSession, decodeSession } from "../lib/jwt";
import * as bcrypt from 'bcrypt'
import { validateEmail } from "../lib/email";

const router = express.Router()
router.use(express.json())



// Get User Information.
router.get("/me", [requireJWT], async (req: Request, res: Response) => {
    try {
        let token = req.headers.authorization || null;
        if (!token) {
            res.statusCode = 401
            res.json({ error: "Invalid access token", status: "error" });
            return
        }
        let decodedSession = decodeSession(process.env['SECRET_KEY'] as string, token.split(' ')[1])
        // console.log(decodedSession)
        if (decodedSession.type == 'valid') {
            let userId = decodedSession.session.userId
            let user = await db.user.findFirst({
                where: {
                    id: userId
                }
            })
            let responseData = { id: user?.id, createdAt: user?.createdAt, updatedAt: user?.updatedAt, names: user?.names, email: user?.email, role: user?.role }
            res.statusCode = 200
            res.json({ data: responseData, status: "success" })
            return
        }
    } catch (error) {
        // console.log(error)
        res.statusCode = 400
        res.json({ status: "error", error: error })
        return
    }
});


// Login
router.post("/login", async (req: Request, res: Response) => {
    try {
        let newUser = false
        let { email, password } = req.body;
        if (!validateEmail(email)) {
            res.statusCode = 400
            res.json({ status: "error", message: "invalid email value provided" })
            return
        }
        if (!email && !password && !email) {
            res.statusCode = 400
            res.json({ status: "error", message: "email and password are required to login" })
            return
        }
        let user = await db.user.findFirst({
            where: {
                ...(email) && { email }
            }
        })

        if (!user) {
            res.statusCode = 401
            res.json({ status: "error", message: "Incorrect username/password or password provided." })
            return
        }

        if (user?.verified !== true) {
            // console.log(user)
            res.statusCode = 401
            res.json({ status: "error", message: "Kindly complete password reset or verify your account to proceed. Check reset instructions in your email." })
            return
        }
        const validPassword = await bcrypt.compare(password, user?.password as string);
        if (validPassword) {
            let session = encodeSession(process.env['SECRET_KEY'] as string, {
                createdAt: ((new Date().getTime() * 10000) + 621355968000000000),
                userId: user?.id as string,
                role: user?.role as string
            })
            let userData: any = user?.data
            if (userData.newUser === true) {
                newUser = true
                await db.user.update({
                    where: {
                        ...(email) && { email }
                    },
                    data: {
                        data: { ...userData, newUser: false }
                    }
                })
            }
            res.json({ status: "success", token: session.token, issued: session.issued, expires: session.expires, newUser })
            return
        } else {
            res.statusCode = 401
            res.json({ status: "error", message: "Incorrect username/password or password provided" })
            return
        }
    } catch (error) {
        console.log(error)
        res.statusCode = 401
        res.json({ error: "incorrect email or password" });
        return
    }
});


// Register User
router.post("/register", async (req: Request, res: Response) => {
    try {
        let { email, names, role, password } = req.body;
        if (!validateEmail(email)) {
            res.statusCode = 400
            res.json({ status: "error", message: "invalid email value provided" })
            return
        }
        if (!password) {
            password = (Math.random()).toString()
        }
        let roles: string[];
        roles = ["ADMINISTRATOR", "NURSE", "CLINICIAN", "CHW"]
        if (role && (roles.indexOf(role) < 0)) {
            res.json({ status: "error", message: `Invalid role name *${role}* provided` });
            return
        }
        let salt = await bcrypt.genSalt(10)
        let _password = await bcrypt.hash(password, salt)
        let user = await db.user.create({
            data: {
                email, names, role: (role ? role : 'STAFF'), salt: salt, password: _password
            }
        })
        let userId = user.id
        let session = encodeSession(process.env['SECRET_KEY'] as string, {
            createdAt: ((new Date().getTime() * 10000) + 621355968000000000),
            userId: user?.id as string,
            role: "RESET_TOKEN"
        })
        user = await db.user.update({
            where: {
                id: userId
            },
            data: {
                resetToken: session.token,
                resetTokenExpiresAt: new Date(session.expires)
            }
        })
        let resetUrl = `${process.env['WEB_URL']}/new-password?id=${user?.id}&token=${user?.resetToken}`
        let responseData = { id: user.id, createdAt: user.createdAt, updatedAt: user.updatedAt, names: user.names, email: user.email, role: user.role }
        res.statusCode = 201
        res.json({ user: responseData, status: "success", message: `Password reset instructions have been sent to your email, ${user?.email}` })
        return
    } catch (error: any) {
        res.statusCode = 400
        console.error(error)
        if (error.code === 'P2002') {
            res.json({ status: "error", error: `User with the ${error.meta.target} provided already exists` });
            return
        }
        res.json(error)
        return
    }
});


// Register
router.post("/reset-password", async (req: Request, res: Response) => {
    try {
        let { email, id } = req.body;
        if (email && !validateEmail(email)) {
            res.statusCode = 400
            res.json({ status: "error", message: "invalid email value provided" })
            return
        }
        // Initiate password reset.
        let user = await db.user.findFirst({
            where: {
                ...(email) && { email },
                ...(id) && { id }
            }
        })

        let session = encodeSession(process.env['SECRET_KEY'] as string, {
            createdAt: ((new Date().getTime() * 10000) + 621355968000000000),
            userId: user?.id as string,
            role: "RESET_TOKEN"
        })
        user = await db.user.update({
            where: {
                ...(email) && { email },
                ...(id) && { id }
            },
            data: {
                resetToken: session.token,
                verified: false,
                resetTokenExpiresAt: new Date(session.expires)
            }
        })
        res.statusCode = 200
        let resetUrl = `${process.env['WEB_URL']}/new-password?id=${user?.id}&token=${user?.resetToken}`
        console.log(resetUrl)
        // console.log(response)
        res.json({ message: `Password reset instructions have been sent to your email, ${user?.email}`, status: "success", });
        return

    } catch (error: any) {
        console.log(error)
        res.statusCode = 401
        if (error.code === 'P2025') {
            res.json({ error: `Password reset instructions have been sent to your email`, status: "error" });
            return
        }
        res.json({ error: error, status: "error" });
        return
    }
});

// Set New Password
router.post("/new-password", [requireJWT], async (req: Request, res: Response) => {
    try {
        let { password, id } = req.body;
        let user = await db.user.findFirst({
            where: {
                id: id as string
            }
        })
        let token = req.headers.authorization || '';
        let decodedSession = decodeSession(process.env['SECRET_KEY'] as string, token.split(" ")[1] as string)
        if ((decodedSession.type !== 'valid') || !(user?.resetToken) || ((user?.resetTokenExpiresAt as Date) < new Date())
            || (decodedSession.session?.role !== 'RESET_TOKEN')
        ) {
            res.statusCode = 401
            res.json({ error: `Invalid and/or expired password reset token. Code: ${decodedSession.type}`, status: "error" });
            return
        }
        let salt = await bcrypt.genSalt(10)
        let _password = await bcrypt.hash(password, salt)
        let response = await db.user.update({
            where: {
                id: id as string
            },
            data: {
                password: _password, salt: salt, resetToken: null, resetTokenExpiresAt: null, verified: true
            }
        })
        // console.log(response)
        res.statusCode = 200
        res.json({ message: "Password Reset Successfully", status: "success" });
        return
    } catch (error) {
        console.error(error)
        res.statusCode = 401
        res.json({ error: error, status: "error" });
        return
    }

});


// Delete User
router.delete("/:id", async (req: Request, res: Response) => {
    try {
        let { id } = req.params;
        let user = await db.user.delete({
            where: {
                id: id
            }
        })
        let responseData = user
        res.statusCode = 201
        res.json({ user: responseData, status: "success" })
        return
    } catch (error: any) {
        res.statusCode = 400
        console.error(error)
        if (error.code === 'P2002') {
            res.json({ status: "error", error: `User with the ${error.meta.target} provided already exists` });
            return
        }
        res.json(error)
        return
    }
});



export default router