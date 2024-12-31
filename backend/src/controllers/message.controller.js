import User from "../models/user.model.js";
import Message from "../models/message.model.js";
export const getUsersForSidebar = async (req, res) => {
  //get users for sidebar
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");
    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("Error getting users for sidebar", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getMessages = async (req, res) => {
  //get messages between the two users
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id; //sender id is the logged in user
    //get messages between the two users
    const messages = await Message.find({
      //filter messages between the two users
      $or: [
        { senderId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: senderId },
      ],
    });
    res.status(200).json(messages);
  } catch (error) {
    console.log("Error getting messages", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const sendMessage = async (req, res) => {
  //Can receive text or image
  //send message to a user
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id; //sender id is the logged in user
    let imageUrl;
    if (image) {
      // Upload base 64 image to cloudinary
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }
    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });
    await newMessage.save();

    //todo: real time functionality
    res.status(200).json(newMessage);
  } catch (error) {
    console.log("Error sending message", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
