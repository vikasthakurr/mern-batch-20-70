import User from "../../models/user.model.js";

const deleteProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.clearCookie("token");
    res.status(200).json({ message: "Profile deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export default deleteProfile;
