const path = require("path");

const fs = require("fs/promises");

const Jimp = require("jimp");

const { basedir } = global;

const { User } = require(`${basedir}/models/user`);

const avatarDir = path.join(basedir, "public", "avatars");

const updateAvatar = async (req, res) => {
  const { path: tmpPath, originalname } = req.file;
  const { _id: id } = req.user;
  const [extension] = originalname.split(".").reverse();
  const newNameAvatar = `${id}.${extension}`;

  const image = await Jimp.read(tmpPath);
  await image
    .autocrop()
    .cover(250, 250, Jimp.HORIZONTAL_ALIGN_LEFT | Jimp.VERTICAL_ALIGN_TOP)
    .quality(75)
    .writeAsync(tmpPath);

  try {
    const uploadPath = path.join(avatarDir, newNameAvatar);
    await fs.rename(tmpPath, uploadPath);

    const avatarURL = path.join("public", "avatars", newNameAvatar);
    await User.findByIdAndUpdate(id, { avatarURL });

    return res.json({
      status: "Success",
      code: 200,
      message: "Image uploaded successfully",
      data: {
        avatarURL,
      },
    });
  } catch (error) {
    await fs.unlink(tmpPath);
    throw error;
  }
};

module.exports = updateAvatar;
