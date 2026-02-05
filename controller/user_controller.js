const User = require('../models/user_modal')
const bcrypt = require("bcryptjs");
const btoa = require("btoa");
const atob = require("atob")

const addUser = async (req, res) => {
    try {
        console.log('req,body12345', req.body);
        if (!req.body.name || !req.body.email || !req.body.password || !req.body.role) {
            return res.status(400).json({
                message: "name, email, password, and role are required"
            });
        }
        const password = req.body.password
        const hashedPassword = await bcrypt.hash(password, 10);
        const base_64_password = btoa(password)

        const user = await new User({
            name: !!req.body.name ? req.body.name : null,
            email: !!req.body.email ? req.body.email : null,
            password: hashedPassword,
            password_base64: base_64_password,
            contact_no: !!req.body.contact_no ? req.body.contact_no : null,
            address1: !!req.body.address1 ? req.body.address1 : null,
            address2: !!req.body.address2 ? req.body.address2 : null,
            city: !!req.body.city ? req.body.city : null,
            state: !!req.body.state ? req.body.state : null,
            country: !!req.body.country ? req.body.country : null,
            role: !!req.body.role ? req.body.role : null,
            image: null
        }).save();

        return res.status(201).json({
            message: "User added successfully",
            success: true,
            user
        });
    } catch (error) {
        console.error("Error adding user:", error);
        res.status(500).json({ message: "Server Error", success: false });
    }
}

const getUser = async (req, res) => {
    try {
        console.log('fetch');
        const getUser = await User.fetchAll()

        const userList = getUser.toJSON().map(user => {
            return {
                id: user.id,
                name: user.name,
                email: user.email,
                contact_no: user.contact_no,
                address1: user.address1,
                address2: user.address2,
                city: user.city,
                state: user.state,
                country: user.country,
                role: user.role,
                image: user.image,
                decoded_password: user.password_base64
                    ? atob(user.password_base64)
                    : null
            };
        });
        return res.status(200).json({
            message: "Users fetched successfully",
            success: true,
            users: userList
        });
    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({ message: "Server Error", success: false });
    }
}

const getSIngleUser = async (req, res) => {
    try {
        console.log('req.params.id', req.params.id);
        const getSingleUser = await User
            .where({ id: req.params.id })
            .fetch()

        if (!getSingleUser) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }
        return res.status(200).json({
            message: "Users fetched successfully",
            success: true,
            users: getSingleUser
        });

    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({ message: "Server Error", success: false });
    }
}


const updateUser = async (req, res) => {
    try {

        if (!req.body.id) {
            return res.status(400).json({
                message: "User ID is required",
                success: false
            });
        }
        const UserData = await User.where({ id: req.body.id })
            .fetch()

        if (!UserData) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        const updateData = {
            name: !!req.body.name ? req.body.name : UserData.name,
            email: !!req.body.email ? req.body.email : UserData.email,
            contact_no: !!req.body.contact_no ? req.body.contact_no : UserData.contact_no,
            address1: !!req.body.address1 ? req.body.address1 : UserData.address1,
            address2: !!req.body.address2 ? req.body.address2 : UserData.address2,
            city: !!req.body.city ? req.body.city : UserData.city,
            state: !!req.body.state ? req.body.state : UserData.state,
            country: !!req.body.country ? req.body.country : UserData.country,
            role: !!req.body.role ? req.body.role : UserData.role,
            updated_at: new Date()
        }
        if (req.body.password) {
            updateData.password = await bcrypt.hash(req.body.password, 10);
            updateData.password_base64 = btoa(req.body.password);
        }
        const updatedUser = await UserData.save(updateData, { patch: true });

        return res.status(200).json({
            message: "User updated successfully",
            success: true,
            user: updatedUser
        });
    } catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({ message: "Server Error", success: false });
    }
}
module.exports = { addUser, getUser, getSIngleUser, updateUser}